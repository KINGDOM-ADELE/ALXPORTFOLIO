import React from 'react';
import './ChatMessage.css'; // Import your CSS file

function ChatMessage({ text, user }) {
  const messageClass = user ? 'user-message' : 'other-user-message';

  return (
    <div className={messageClass}>
      {text}
    </div>
  );
}

export default ChatMessage;
