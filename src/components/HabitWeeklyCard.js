import React from 'react';
import '../styles/HabitWeeklyList.css';

const HabitWeeklyCard = ({ habit }) => {
  // Check if the habit is null or invalid
  if (!habit) {
    return (
      <div className="HabitWeeklyCard">
        <p>No Habit in this spot!</p>
      </div>
    );
  }

  const { name, weeklyCompletion } = habit;

  return (
    <div className="HabitWeeklyCard">
      <h2>{name}</h2>
      <table className="WeeklyProgress">
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Dates under each day */}
            {weeklyCompletion.map((day) => (
              <td key={`date-${day.date}`}>{day.date}</td>
            ))}
          </tr>
          <tr>
            {/* Tick or cross under each date */}
            {weeklyCompletion.map((day) => (
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

export default HabitWeeklyCard;