import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './SignIn.css';

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        try {
          const userData = await response.json();
          authContext && authContext.login(userData);

          // Redirect to the home page after successful login
          navigate('/home');
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
      } else {
        // Log the error response for debugging
        const errorResponse = await response.text();
        console.error('Error logging in:', errorResponse);

        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>    <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>    <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>  <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>

    <div className="sign-in-container">
      <h1 className="sign-in-title">Recipify</h1>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        {loginError && <div className="error-message">{loginError}</div>}
        <button type="submit">Sign In</button>
      </form>
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
    <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>    <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>  <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>   <div style={{ color: 'black' }}>hey</div>
    </>
  );
};

export default SignInPage;
