import { Link } from 'react-router-dom';
import './SignUp.css'; // Make sure to create this CSS file

import React, { useState, ChangeEvent, FormEvent } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthday: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User signed up successfully');
        // Redirect to another page or display a success message
      } else {
        console.error('Error signing up');
        // Handle error (display error message or handle accordingly)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (display error message or handle accordingly)
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <Link to="/signin">Already have an account? Sign In!</Link>
      </form>
    </div>
  );
};

export default SignUpPage;
