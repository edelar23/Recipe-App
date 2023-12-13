// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ViewRecipe from './viewRecipe';
import SignInPage from './SignIn';
import CalendarPage from './CalendarPage';
import CreatePost from './CreatePost';
import SignUpPage from './Signup';
import Home from './Home';
import RequireAuth from './PrivateRoute'; // Import the RequireAuth component
import './App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/view/:postId" element={<ViewRecipe />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
