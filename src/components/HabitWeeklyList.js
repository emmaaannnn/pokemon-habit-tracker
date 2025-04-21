import React, { useEffect, useState } from 'react';
import HabitWeeklyCard from './HabitWeeklyCard.js'; // Import the HabitWeeklyCard component
import { fetchUserHabits } from '../services/api.js'; // Import the fetch habits API function

const HabitWeeklyList = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
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

        // Process habits to include weekly completion data
        const weeklyProgress = userHabits.habits.map((habit) => {
          const weeklyCompletion = currentWeekDates.map((date) => ({
            date,
            completed: habit.completionHistory.daily[date] || false,
          }));
          return { ...habit, weeklyCompletion };
        });

        setHabits(userHabits.habits);
        setWeeklyData(weeklyProgress);
      } catch (error) {
        console.error('Error fetching habits:', error);
        setError('Failed to fetch habits.');
      }
    };

    fetchHabits();
  }, [userId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (weeklyData.length === 0) {
    return <p>No habits to display.</p>;
  }

  return (
    <div>
      <h1>Weekly Habit Tracker</h1>
      <div className="HabitWeeklyList">
        {weeklyData.map((habit) => (
          <HabitWeeklyCard key={habit.habitId} habit={habit} /> // Render a card for each habit
        ))}
      </div>
    </div>
  );
};

export default HabitWeeklyList;