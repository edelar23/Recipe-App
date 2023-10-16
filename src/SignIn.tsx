import React from 'react';
import {Link} from 'react-router-dom'; 
import './SignIn.css';

const SignInPage: React.FC = () => {
  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
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
            required
            placeholder="Enter your password"
          />
        </div>
        <Link to="/">
          <button>Sign In</button>
          </Link>
      </form>
    </div>
  );
};

export default SignInPage;
