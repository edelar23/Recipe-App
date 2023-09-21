import React from 'react';

function Message() {
  const searchBarStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px', // Adjust the width as needed
    padding: '10px',
    fontSize: '1rem', // Adjust the font size as needed
    border: '2px solid #333', // Add border for styling
    borderRadius: '5px', // Add border radius for styling
    backgroundColor: '#fff', // Set background color
  };

  return (
    <div style={searchBarStyle}>
      <input
        type="text"
        placeholder="Search..."
        style={{ width: '100%', border: 'none', outline: 'none' }}
      />
    </div>
  );
}

export default Message;
