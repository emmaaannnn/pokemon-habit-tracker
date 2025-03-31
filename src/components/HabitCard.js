import React from 'react';

const HabitCard = ({ habit }) => {
  return (
    <div>
      <h3>{habit.name}</h3>
      <p>Progress: {habit.progress}%</p>
    </div>
  );
};

export default HabitCard;
