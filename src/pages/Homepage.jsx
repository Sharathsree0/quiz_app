import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.css' 

function Homepage() {
  return (
    <div className="home-container">
      <div className="circle one"></div>
      <div className="circle two"></div>

      <h1>Welcome to Quizify 🎯</h1>
      <p>Test your knowledge and challenge your friends!</p>

      <div className="home-buttons">
        <Link to="/quiz">
          <button className="home-btn">Start Quiz</button>
        </Link>

        <Link to="/adminlogin">
          <button className="home-btn">Admin Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Homepage
