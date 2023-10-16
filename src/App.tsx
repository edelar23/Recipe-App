import LeftMenu from './LeftMenu';
import PostComponent from './post';
import CreatePost, { createRecipe } from './CreatePost';
import ViewRecipe from './viewRecipe';
import SignInPage from './SignIn';
import './App.css'; // Import your global CSS styles if needed
import { BrowserRouter as Router, Route, Routes, Form, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} action={createRecipe} />
      <Route path="/view" element={<ViewRecipe />} />
      <Route path="/signin" element={<SignInPage />} />
    </Route>
  )
)


function Home(){
  return(
    <div>
      <PostComponent />
      <LeftMenu />
    </div>
  );
}
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
