import React, { useState } from 'react';

interface DayProps {
  dayNumber: number;
}

const Day: React.FC<DayProps> = ({ dayNumber }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="day" onClick={() => setIsClicked(!isClicked)}>
      {dayNumber}
      {isClicked && (
        <div className="options">
          <button onClick={() => alert('Add/Remove a recipe')}>Add/Remove a recipe for this day</button>
          <button onClick={() => alert('View The Recipes')}>View The Recipes for This Day</button>
        </div>
      )}
    </div>
  );
}

export default Day;
