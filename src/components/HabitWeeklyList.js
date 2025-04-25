import React, { useEffect, useState } from 'react';
import HabitWeeklyCard from './HabitWeeklyCard';
import { fetchUserHabits } from '../services/api';

const HabitWeeklyList = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Utility function to get current week's dates
  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDay)); // Get Sunday of the current week
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    });
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const userHabits = await fetchUserHabits(userId); // Fetch habits for the user
        const currentWeekDates = getCurrentWeekDates();
  
        // Map habits to include weekly completion data, handling null values
        const weeklyProgress = userHabits.habits.map((habit) => {
          if (habit === null) {
            return null; // Preserve null values for empty spots
          }
  
          const weeklyCompletion = currentWeekDates.map((date) => ({
            date,
            completed: habit.completionHistory.daily[date] || false,
          }));
  
          return { ...habit, weeklyCompletion };
        });
  
        setHabits(weeklyProgress); // Updated state includes weekly completion data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching habits:', error);
        setError('Failed to fetch habits.');
        setLoading(false);
      }
    };
  
    fetchHabits();
  }, [userId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (habits.length === 0) {
    return <p>No habits to display.</p>;
  }

  if (loading) {
    return <p>Loading your Habits...</p>; // Show loading state
  }

  return (
    <div>
        <div className="HabitWeeklyList">
          {habits.map((habit, index) => (
            <HabitWeeklyCard key={index} habit={habit} />
          ))}
        </div>
    </div>
  );
};

export default HabitWeeklyList;