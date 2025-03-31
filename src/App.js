import React, { useState } from 'react';

function App() {
  const [habits, setHabits] = useState([]);

  const addHabit = (name) => {
    const newHabit = { id: Date.now(), name, progress: 0 };
    setHabits([...habits, newHabit]);
  };

  return (
    <div>
      <h1>Pokémon Habit Tracker</h1>
      <button onClick={() => addHabit('New Habit')}>Add Habit</button>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - Progress: {habit.progress}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;