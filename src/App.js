import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import SplashScreen from './SplashScreen';
import UsernameInput from './UsernameInput';
import OnlineUsers from './OnlineUsers';

// const socket = io.connect(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');
const socket = io.connect('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Send message to the backend
  const sendMessage = () => {
    if (message !== '' && socket.connected) {
      const messageData = {
        content: message,
        id: socket.id,
        username: username,
        timestamp: new Date().toISOString(),
      };

      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (username !== '') {
      socket.emit('user_connected', username);
    }
  }, [username]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    const updateOnlineUsersHandler = (users) => {
      setOnlineUsers(users);
    };

    socket.on('receive_message', receiveMessageHandler);
    socket.on('update_online_users', updateOnlineUsersHandler);

    return () => {
      socket.off('receive_message', receiveMessageHandler);
      socket.off('update_online_users', updateOnlineUsersHandler);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (username === '') {
    return <UsernameInput setUsername={setUsername} />;
  }

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      <div className="main-container">
        <div className="chat-container">
          <OnlineUsers users={onlineUsers} />
          <div className="chat-content">
            <div className="chat-box">
              {messageList.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.id === 'system' ? 'system' : msg.id === socket.id ? 'you' : 'other'}`}
                >
                  <p>
                    {msg.id !== 'system' && <strong>{msg.username}: </strong>}
                    {msg.content}
                    <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="input-container">
              <input
                type="text"
                value={message}
                placeholder="Type a message..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
