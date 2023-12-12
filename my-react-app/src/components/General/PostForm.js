import React, { useContext, useState } from 'react';
import './chat-app.css'; // Import the consolidated CSS file
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';

function PostForm({ support_ticket_id }) {
  const { API_base_url, getStoredToken, messages, setMessages } = useContext(AppContext);

  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const handlePost = async (e) => {
    e.preventDefault();
  
    if (message.trim() === '' && files.length === 0) {
      // Check if both message and files are empty
      Swal.fire('Please enter a message or attach a file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('supportTicketId', support_ticket_id);
    formData.append('message', message);
  
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  
    try {
      const response = await fetch(`${API_base_url}api/v1/supports`, {
        method: 'POST',
        body: formData,
        headers: {
          'authorization': `Bearer ${getStoredToken()}`,
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 'success') {
          // Create a new array with the updated message
          const updatedMessages = [...messages, responseData.data];
  
          // Update the context state with the new messages
          setMessages(updatedMessages);
  
          // Clear the message and files
          setMessage('');
          setFiles([]);
        } else {
          // Handle the case when the API request succeeds but the response indicates an error
          // Swal.fire(responseData.message || 'An error occurred while posting.');
        }
      } else {
        // Handle HTTP errors (e.g., 4xx, 5xx)
        Swal.fire('An error occurred while posting.');
      }
    } catch (error) {
      // Handle network or unexpected errors
      Swal.fire('An error occurred while posting.');
      console.error('Error:', error);
    }
  };
  


  return (
    <form className="post-form" onSubmit={handlePost}>
      <div className="chatPostDiv">
        <label className="file-upload post-button" style={{ flex: '5%', backgroundColor: '#4CAF50', color: '#fff' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"  viewBox="0 0 20 20"><path fill="currentColor" d="m5.28 10.609l5.304-5.304a2.75 2.75 0 1 1 3.889 3.89l-6.364 6.364A1.25 1.25 0 1 1 6.34 13.79l5.657-5.657a.75.75 0 0 0-1.06-1.06L5.28 12.73a2.75 2.75 0 0 0 3.89 3.89l6.363-6.365a4.25 4.25 0 0 0-6.01-6.01L4.22 9.548a.75.75 0 0 0 1.06 1.06Z"/></svg>
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} multiple />
        </label>

        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
          rows="3"
          className="post-textarea"
          style={{ flex: '90%' }}
        ></textarea>

        <button type="submit" className="post-button" style={{ flex: '5%' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 16 16"><path fill="currentColor" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576L6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76l7.494-7.493Z"/></svg>
        </button>
      </div>
    </form>
  );
}

export default PostForm;
