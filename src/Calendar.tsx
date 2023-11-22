import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa'; //npm install react-icons
import './Calendar.css';
import Day from './Day';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

function Calendar() {
  const currentDate = new Date();
  const monthYear = format(currentDate, 'MMMM yyyy');
  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const initialDailyMacros = {
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  const [dailyMacros, setDailyMacros] = useState(initialDailyMacros);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMacros, setEditedMacros] = useState({ ...initialDailyMacros });

  useEffect(() => {
    // Load daily macros from the server when the component mounts
    fetchDailyMacros();
  }, []);

  const fetchDailyMacros = async () => {
    try {
      const userId = 1; // have to replace with the actual user id
      const response = await fetch(`http://localhost:3000/getDailyMacros/${userId}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const data = await response.json();
        setDailyMacros(data);
      } else {
        console.error('Error fetching daily macros from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditIconClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:3000/updateDailyMacros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMacros),
      });

      if (response.ok) {
        console.log('Daily macros saved to the database');
        setDailyMacros({ ...editedMacros });
        setIsEditing(false);
      } else {
        console.error('Error saving daily macros to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedMacros({ ...dailyMacros });
    setIsEditing(false);
  };

  return (
    <div className="calendar">
      <div className="daily-macros">
        {isEditing ? (
          <>
            <input
              type="number"
              value={editedMacros.protein}
              onChange={(e) => setEditedMacros({ ...editedMacros, protein: +e.target.value })}
            />
            <input
              type="number"
              value={editedMacros.carbs}
              onChange={(e) => setEditedMacros({ ...editedMacros, carbs: +e.target.value })}
            />
            <input
              type="number"
              value={editedMacros.fats}
              onChange={(e) => setEditedMacros({ ...editedMacros, fats: +e.target.value })}
            />
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <div>{dailyMacros.protein} Protein</div>
            <div>{dailyMacros.carbs} Carbs</div>
            <div>{dailyMacros.fats} Fats</div>
            <FaPencilAlt onClick={handleEditIconClick} style={{ cursor: 'pointer' }} />
          </>
        )}
      </div>

      <div className="calendar-header">{monthYear}</div>
      {weekdays.map(day => (
        <div className="weekday" key={day}>
          {day}
        </div>
      ))}
      {daysOfMonth.map(date => (
        <Day key={date.toString()} dayNumber={date.getDate()} />
      ))}
    </div>
  );
}

export default Calendar;