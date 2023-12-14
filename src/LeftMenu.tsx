import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import './LeftMenu.css';

function LeftMenu() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    authContext && authContext.logout();
    navigate('/'); // Navigate to the sign-in screen after signing out
  };

  return (
    <div className="left-menu">
      <div className="menu-title">Recipify</div>
      <div className="menu-divider"></div>
      <div className="menu-item">
        <Link to="/home"><button>Home</button></Link>
      </div>
      <div className="menu-item">
        <Link to="/profile"><button>Profile</button></Link>
      </div>
      <div className="menu-item">
        <Link to="/notifications"><button>Notifications</button></Link>
      </div>
      <div className="menu-item">
        <Link to="/calendar"><button>Calendar</button></Link>
      </div>
      <div className="menu-item">
        <Link to="/bookmarks"><button>Bookmarks</button></Link>
      </div>
      <div className="menu-item">
        <Link to="/create"><button>Create a Post</button></Link>
      </div>
      <div className="menu-item" onClick={handleSignOut}>
        <button>Sign Out</button>
      </div>
    </div>
  );
}

export default LeftMenu;
