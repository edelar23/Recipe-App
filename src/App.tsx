import LeftMenu from './LeftMenu';
import Message from './message';
import PostComponent from './post';
import './App.css'; // Import your global CSS styles if needed

function App() {
  return (
    <div>
      <div className="app-container">
        <LeftMenu />
        <Message />{}

        <div className = "main-page">
          <PostComponent/>
          <PostComponent/>
        </div>

      </div>
    </div>
  );
}

export default App;
