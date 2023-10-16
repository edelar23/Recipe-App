import React from 'react';
import './Calendar.css';
import Day from './Day';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

const Calendar: React.FC = () => {
  const currentDate = new Date();

  // Get the month and year for the title
  const monthYear = format(currentDate, 'MMMM yyyy');

  // Get all days of the current month
  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="calendar">
      <div className="calendar-header">
        {monthYear}
      </div>
      {weekdays.map(day => (
        <div className="weekday" key={day}>{day}</div>
      ))}
      {daysOfMonth.map(date => (
        <Day key={date.toString()} dayNumber={date.getDate()} />
      ))}
    </div>
  );
}

export default Calendar;
