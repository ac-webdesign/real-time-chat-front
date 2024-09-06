import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import SplashScreen from './SplashScreen';
import UsernameInput from './UsernameInput';

// const socket = io.connect(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');
const socket = io.connect('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState('');


  // Send message to the backend
  const sendMessage = () => {
    if (message !== '' && socket.connected) {
      const messageData = {
        content: message,
        id: socket.id,
        username: username,
      };

      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  // Handle splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Receive messages from the backend
  useEffect(() => {
    // Listen for receiving messages
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Cleanup function to avoid duplicate listeners
    return () => {
       socket.off('receive_message');
    };
  }, []);


  if (showSplash) {
    return <SplashScreen />; // Show the splash screen
  }

  if (username === '') {
    return <UsernameInput setUsername={setUsername} />; // Show the username input
  }

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      <div className="chat-container">
        <div className="chat-box">
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.id === socket.id ? 'you' : 'other'}`}
            >
              <p><strong>{msg.username}: </strong>{msg.content}</p>
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
  );
}

export default App;
