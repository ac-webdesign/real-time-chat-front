// UsernameInput.js
import React, { useState } from 'react';

function UsernameInput({ setUsername }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue); // Pass the username to the parent App component
    }
  };

  return (
    <div className="username-input-container">
      <form onSubmit={handleSubmit}>
        <h2>Enter your username</h2>
        <input
          type="text"
          value={inputValue}
          placeholder="Username"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
}

export default UsernameInput;
