import LeftMenu from './LeftMenu';
import Message from './message';
import './App.css'; // Import your global CSS styles if needed

function App() {
  return (
    <div className="app-container">
      <LeftMenu />
      <div className="content">
        <Message />
        {/* Other content of your website */}
      </div>
    </div>
  );
}

export default App;
