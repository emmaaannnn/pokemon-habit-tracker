// import React from 'react';
// import Header from '../components/Header.js';
// import Navbar from '../components/NavBar.js';

// const Habit = ({ setCurrentPage }) => {
//   return (
//     <div>
//       <Header />
//       <h1>Habit Tracker</h1>
//       <p>Track your habits and see your Pokémon progress.</p>
//       <Navbar onSelect={setCurrentPage} />
//     </div>
//   );
// };

// export default Habit;

import React, { useState, useEffect } from 'react';
import { getHabits, completeHabit } from '../services/api';

const Habits = ({ userId }) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabits(userId);
        setHabits(data);
      } catch (error) {
        console.error('Failed to fetch habits:', error);
      }
    };
    fetchHabits();
  }, [userId]);

  const handleComplete = async (habitId) => {
    try {
      const response = await completeHabit(habitId);
      setHabits((prev) =>
        prev.map((habit) =>
          habit._id === habitId ? { ...habit, isCompleted: true } : habit
        )
      );
      console.log('Habit completed:', response);
    } catch (error) {
      console.error('Failed to complete habit:', error);
    }
  };

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <span
              style={{
                textDecoration: habit.isCompleted ? 'line-through' : 'none',
              }}
            >
              {habit.name}
            </span>
            {!habit.isCompleted && (
              <button onClick={() => handleComplete(habit._id)}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habits;
