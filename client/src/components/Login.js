import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import { loginUser } from "../api/contacts";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      alert('Please enter an email');
    }
    if (password === '' || password === null) {
      result = false;
      alert('Please enter a password');
    }
    return result;
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    
      
        if (!validate()) {
          return;
        }
      
        try {
          const response = await loginUser(email, password);
          const { message, token } = response.data;
      
          if (message === 'Login successful') {
            localStorage.setItem('token', token);
            navigate('/contact-list');
          } else {
            setError('Invalid email or password');
          }
        } catch (error) {
          setError('Failed to perform login');
          console.error(error);
        }
      
    };
      
  

   

  return (
    <div> 
      <div>
        <form className="contactForm" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="error">{error}</p>}

          <LoginButton />

          <div>
            <p>Don't have an account?
              <Link to="/sign_up" style={{ color: "blue" }}>Sign Up</Link>
            </p>
          </div>
          <div>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
