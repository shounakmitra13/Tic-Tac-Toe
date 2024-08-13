import React from 'react';
import "../App.css"; // Ensure correct path to the CSS file

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <h1 className='header-title'>Tic-Tac-Toe</h1>
        <a href="https://github.com/shounakmitra13/Tic-Tac-Toe" target="_blank" rel="noopener noreferrer" className="github-logo-link">
          <img src="github-mark.png" alt="GitHub" className="github-logo"/>
        </a>
      </div>
    </header>
  );
};

export default Header;
