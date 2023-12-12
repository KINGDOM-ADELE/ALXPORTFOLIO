import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Icon } from '@iconify/react';

import './adminsidebar.css';
import { AppContext } from '../../Context/App_Context';



export function Adminsidebar(props) {
  const { getStoredUserObj, logout, isLoggedIn, newContactMessageCount, newSupportCount } = useContext(AppContext)

  const navigate = useNavigate();

    let namex
   if(isLoggedIn() && getStoredUserObj()){
    namex = `${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`
   } 

  const handleLogout = () => {  
    logout()
     navigate(`/`)
  } 

  const { isOpen, onClose } = props;

  let newSupportCountVal
  newSupportCount && (newSupportCountVal = <span className='notifyCounts'>({newSupportCount})</span>)
  let newContactMessageCountVal
  newContactMessageCount && (newContactMessageCountVal = <span className='notifyCounts'>({newContactMessageCount})</span>)

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`} id='sidebar'>
      <ul>
      <li>
          <Link to="#" onClick={onClose} className='dash' id='dash'>
          <svg xmlns="http://www.w3.org/2000/svg" className='dashicon' width='30' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9a9 9 0 0 0-9 9a9 9 0 0 0 9 9zM9 8l6 8m0-8l-6 8"/></svg>
            <span>Admin-Dashboard</span> 
          </Link>
        </li>
                
        <li className='linkNot '>
          {"GREETINGS"}
          <br />
            { namex }
        </li>
      </ul>
  <div  className="AdminSideBareScroll">
      <ul>
        <li>
          <Link to="./stats" onClick={onClose}>
            Stats
          </Link>
        </li>

        <li>
          <Link to="./users" onClick={onClose}>
            Users
          </Link>
        </li>


        <li>
          <Link to="./allcourses" onClick={onClose}>
            Courses
          </Link>
        </li>

               
        <li>
          <Link to="./allprospects" onClick={onClose}>
            All Prospects
          </Link>
        </li>

        <li>
          <Link to="./enquiries" onClick={onClose}>
            Enquiries
          </Link>
        </li>

        <li>
          <Link to="./graduates" onClick={onClose}>
             Graduates
          </Link>
        </li>

        <li>
          <Link to="./removeuser" onClick={onClose}>
             Remove users
          </Link>
        </li>

        <li>
          <Link to="./myprofile" onClick={onClose}>
            My Profile
          </Link>
        </li>
        

        <li>
          <Link to="./feeds" onClick={onClose}>
             Feeds
          </Link>
        </li>

        
        <li>
          <Link to="./adminsupport" onClick={onClose}>
             Support {newSupportCountVal}
          </Link>
        </li>

        <li>
          <Link to="./contactmessages" onClick={onClose}>
             Contact Messages {newContactMessageCountVal}
          </Link>
        </li>

        {
          isLoggedIn() && getStoredUserObj().role === 'admin' &&
          (
          <li>
            <Link to="/User" onClick={onClose}>
              Student-Dashboard
            </Link>
          </li>
          )
        }

      </ul>
    </div>
      <ul>

        <li onClick={handleLogout}  >
          <Link >
            Log out
          </Link>
          
        </li>
  
      </ul>
    </nav>
  );
}

;