import LeftMenu from './LeftMenu';
import Message from './message';
import PostComponent from './post';
import CreatePost, { createRecipe } from './CreatePost';
import ViewRecipe from './viewRecipe';
import './App.css'; // Import your global CSS styles if needed
import { BrowserRouter as Router, Route, Routes, Form, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} action={createRecipe} />
      <Route path="/view" element={<ViewRecipe />} />
    </Route>
  )
)


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
    <RouterProvider router={router} />
  );
}

export default App;
