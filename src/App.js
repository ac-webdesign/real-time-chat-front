import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Connect to the backend socket server

const socket = io.connect(process.env.REACT_APP_BACKEND_URL || 'https://real-time-chat-qgos.onrender.com/');

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // Send message to the backend
  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        content: message,
        id: socket.id,
      };

      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

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
              <p>{msg.content}</p>
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
