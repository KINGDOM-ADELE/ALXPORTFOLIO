
// Inside ChatMessage.jsx
import React from 'react';
import './chat-app.css'; // Import the consolidated CSS file;

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Use 12-hour format (AM/PM)
  };

  return date.toLocaleString(undefined, options);
}

function ChatMessage({ message, user, API_base_url  }) {
  const messageClass = user ? 'user-message' : 'other-user-message';

  return (
    <div className={messageClass}>
      {message.files && message.files.length > 0 && (
        <div className="message-files">
          {message.files.map((file, fileIndex) => (
            <div key={fileIndex} className="file">
              {file.fileType.startsWith('image/') ? (
                <img src={API_base_url+file.filePath} alt={`File ${fileIndex}`} />
              ) : file.fileType.startsWith('video/') ? (
                <video controls>
                  <source src={API_base_url+file.filePath} type={file.fileType} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a href={API_base_url+file.filePath} target="_blank" rel="noopener noreferrer">
                  {file.fileName}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      {message.message && (
        <div className="message-text">{message.message}</div>
      )}
      {message.created && (
        <div className="message-timestamp">
          {formatTimestamp(message.created)}
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
