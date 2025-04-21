import React from 'react';

const HabitWeeklyCard = ({ habit }) => {
  const { name, weeklyCompletion } = habit;

  return (
    <div className="HabitWeeklyCard">
      <h2>{name}</h2>
      <table className="WeeklyProgress">
        <thead>
          <tr>
            <th>Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {weeklyCompletion.map((day) => (
            <tr key={day.date}>
              <td>{day.date}</td>
              <td>{day.completed ? '✔️' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitWeeklyCard;