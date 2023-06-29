import React, { useRef, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { signUpUser } from "../api/contacts";

const SignUp = () => {
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate("");

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    

    // Perform validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

   
    try {
      
      await signUpUser ( 
        username,
        email,
        password,
      );
      userRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';
      confirmPasswordRef.current.value = '';
      alert('Registration successful!');
      navigate('/Login');
    } catch (error) {
      console.error(error);
      alert('Failed to register user');
    }
  };

  return (
    <div className="registration-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" ref={userRef} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" ref={confirmPasswordRef} required />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <div>
            <p>Already have an account!
              <Link to="/login" style={{ color: "blue" }}>Log In</Link>
            </p>
          </div>
    </div>
  );
};

export default SignUp;
