import React from 'react';

function OnlineUsers({ users }) {
  return (
    <div className="online-users">
      <h3>Online Users <span className="user-count">({users.length})</span></h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <span className="user-status"></span>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;