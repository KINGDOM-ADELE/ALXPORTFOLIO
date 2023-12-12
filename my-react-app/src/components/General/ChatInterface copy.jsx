// src/components/General/ChatInterface.js
import React from 'react';
import './chat-app.css'; // Import the consolidated CSS file
import ChatMessage from './ChatMessage';

function ChatInterface({ messages }) {
  return (
    <div className="chat-interface">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          text={message.text}
          user={message.user === 'user'} // Adjust this based on your data structure
        />
      ))}
    </div>
  );
}



export default ChatInterface;
