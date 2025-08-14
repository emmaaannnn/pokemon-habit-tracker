import React from 'react';

const HabitMonthlyCard = ({ habit }) => {
  if (!habit) {
    return (
      <div className="HabitMonthlyCard">
        <p>No Habit in this spot!</p>
      </div>
    );
  }

  const { name, monthlyCompletion } = habit;

  return (
    <div className="HabitMonthlyCard">
      <h2>{name}</h2>
      <table className="MonthlyProgress">
        <thead>
          <tr>
            {monthlyCompletion.map((day) => (
              <th key={`date-${day.date}`}>{day.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {monthlyCompletion.map((day) => (
              <td key={`completed-${day.date}`}>
                {day.completed ? '✔️' : '❌'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HabitMonthlyCard;