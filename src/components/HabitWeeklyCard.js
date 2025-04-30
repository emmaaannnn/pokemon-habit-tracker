import React from 'react';
import '../styles/HabitWeeklyList.css';
import { updateHabit } from '../services/api';;

const HabitWeeklyCard = ({ habit, updateHabitCompletion }) => {
  // Check if the habit is null or invalid
  if (!habit) {
    return (
      <div className="HabitWeeklyCard">
        <p>No Habit in this spot!</p>
      </div>
    );
  }

  const { name, weeklyCompletion } = habit;


  const handleCompletionToggle = async (day) => {
    console.log(`Sending request: userId=${habit.userId}, habitId=${habit.id}, date=${day.date}`); // Debugging
  
    try {
      if (!habit.userId || !habit.id) {
        console.error('Missing userId or habitId');
        return;
      }
  
      await updateHabit(habit.userId, { habitId: habit.id, date: day.date });
  
      updateHabitCompletion(habit.id, day.date, true);
    } catch (error) {
      console.error('Error updating habit:', error.message);
    }
  };
  
  


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
            {weeklyCompletion.map((day) => (
              <td key={`date-${day.date}`}>{day.date}</td>
            ))}
          </tr>
          <tr>
            {weeklyCompletion.map((day) => (
              <td key={`completed-${day.date}`}>
                <button onClick={() => handleCompletionToggle(day)}>
                  {day.completed ? '✔️' : '❌'}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};


export default HabitWeeklyCard;