// UsernameInput.js
import React, { useState } from 'react';

function UsernameInput({ setUsername }) {
  const [inputUsername, setInputUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim() !== '') {
      setUsername(inputUsername);
    }
  };

  return (
    <div className="username-input-container">
      <h2>Enter your username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Username"
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
}

export default UsernameInput;
