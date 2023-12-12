// src/components/General/Header.js
import React from 'react';
import './chat-app.css'; // Import the consolidated CSS file
import {Link} from "react-router-dom"


function HeaderAdmin(props) {

    const refreshPage = () => {
        window.location.reload(false);
      }

  return (
    <header className="chat-app-header">
            <span  title='Back to adminsupport'>
              <Link to="/admin/adminsupport"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
            </span>
            <span  className="centerTopic" title='support topic'>
                <p>  Topic: <span><b>{props.topic}</b> </span></p>
            </span>
            
            <span onClick={refreshPage} title='Refresh'>
                <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="-1.5 -2.5 24 24"><path fill="currentColor" d="m17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194zM2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792a1 1 0 1 1 1.906.608a9.381 9.381 0 0 1-5.38 5.831a9.386 9.386 0 0 1-11.265-3.328z"/></svg>
            </span>
    </header>
  );
}

export default HeaderAdmin;
