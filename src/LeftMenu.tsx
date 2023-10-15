import { Link } from 'react-router-dom';
import './LeftMenu.css'; // Import your CSS for styling

function LeftMenu() {
  return (
    <div className="left-menu">
      <div className="menu-title">Recipify</div>
      <div className="menu-divider"></div>
      <div className="menu-item">
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/">
          <button>Profile</button>
        </Link>
      </div>
        
      <div className="menu-item">
        <Link to="/">
          <button>Notifications</button>
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/">
          <button>Calendar</button>
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/">
          <button>Bookmarks</button>
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/create">
          <button>Create a Post</button>
          </Link>
      </div>
      <div className="menu-item">
        <Link to="/">
          <button>Sign Out</button>
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/view">
          <button>View Recipe (delete later)</button>
          </Link>
      </div>
    </div>
  );
}

export default LeftMenu;
