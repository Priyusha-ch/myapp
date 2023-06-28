import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page content.</p>
      <div>
        <Link to="/login" style={{ color: "blue" }}>Login</Link>
      </div>
      <div>
        <Link to="/sign_up" style={{ color: "blue" }}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
