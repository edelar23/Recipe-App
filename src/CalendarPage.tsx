import React from 'react';
import './CalendarPage.css';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';


const CalendarPage: React.FC = () => {
  return (
    
    <div className="calendar-page">
      <div className="back-button">
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
      <div className="calendar-title"></div>
      <div className="calendar-container">
        <Calendar />
      </div>
    </div>
  );
}

export default CalendarPage;
