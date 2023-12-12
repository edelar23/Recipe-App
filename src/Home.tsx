import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import PostComponent from './post';
import LeftMenu from './LeftMenu';
import './Home.css'; // Create a CSS file for styling

function Home() {
  const authContext = useContext(AuthContext);

  // Check if the user is authenticated and get user information
  const isAuthenticated = authContext && authContext.isAuthenticated;
  const user = authContext && authContext.user;

  return (
    <div className="home-container">
      {isAuthenticated && (
        <div className="greeting">
          <p>Hello, {user && user.name}! This is who is signed in.</p>
        </div>
      )}
      <PostComponent />
      <LeftMenu />
    </div>
  );
}

export default Home;
