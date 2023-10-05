import LeftMenu from './LeftMenu';
import Message from './message';
import PostComponent from './post';
import CreatePost from './CreatePost';
import './App.css'; // Import your global CSS styles if needed
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Home(){
  return(
    <div>
      <PostComponent />
      <LeftMenu />
      <Message />
    </div>
  );
}
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
