import React, { useEffect, useState } from 'react';
import HabitMonthlyCard from './HabitMonthlyCard';
import { fetchUserHabits } from '../services/api';

const HabitMonthlyList = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Utility function to get all dates in the current month
  const getCurrentMonthDates = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const lastDay = new Date(year, month + 1, 0).getDate(); // Get total days in the month
    return Array.from({ length: lastDay }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    });
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const userHabits = await fetchUserHabits(userId); // Fetch habits for the user
        console.log("Raw API response:", userHabits);

        if (!userHabits || !userHabits.habits) {
          setError('No habits found.');
          setLoading(false);
          return;
        }

        const currentMonthDates = getCurrentMonthDates();
        console.log("Generated month dates:", currentMonthDates);

        // Map habits to include monthly completion data
        const monthlyProgress = userHabits.habits.map((habit) => {
          if (!habit) return null; // Preserve null values for empty spots

          const monthlyCompletion = currentMonthDates.map((date) => ({
            date,
            completed: habit.completionHistory?.daily?.[date] ?? false, // Ensure completionHistory exists
          }));

          return { ...habit, monthlyCompletion };
        });

        console.log("Mapped monthly habits before setting state:", monthlyProgress);
        setHabits(monthlyProgress);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching habits:', error);
        setError('Failed to fetch habits.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchHabits();
    }
  }, [userId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (loading) {
    return <p>Loading your monthly habits...</p>;
  }

  if (!habits || habits.length === 0) {
    return <p>No habits to display for this month.</p>;
  }

  return (
    <div className="HabitMonthlyList">
      {habits.map((habit, index) => (
        <HabitMonthlyCard key={index} habit={habit} />
      ))}
    </div>
  );
};

export default HabitMonthlyList;