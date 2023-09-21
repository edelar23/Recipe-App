import './LeftMenu.css'; // Import your CSS for styling

function LeftMenu() {
  return (
    <div className="left-menu">
      <div className="menu-title">Flavour Net</div>
      <div className="menu-divider"></div>
      <div className="menu-item">Home</div>
      <div className="menu-item">Profile</div>
      <div className="menu-item">Notifications</div>
      <div className="menu-item">Calendar</div>
      <div className="menu-item">Bookmarks</div>
      <div className="menu-divider"></div>
      <div className="sign-out">Sign Out</div>
    </div>
  );
}

export default LeftMenu;
