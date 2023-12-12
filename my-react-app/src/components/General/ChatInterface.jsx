// src/components/General/ChatInterface.jsx
import React from 'react';
import './chat-app.css'; // Import the consolidated CSS file
import ChatMessage from './ChatMessage';

function ChatInterface({ messages, userid, API_base_url }) {
  return (
    <div className="chat-interface">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message} API_base_url={API_base_url}
          // isCurrentUser={message.createdBy === userid}
          user={message.createdBy === userid} // Adjust this based on your data structure
        />
      ))}
    </div>
  );
}

export default ChatInterface;
