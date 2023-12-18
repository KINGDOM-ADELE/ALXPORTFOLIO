import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './usersidebar.css';
import { AppContext } from '../../Context/App_Context';


export function Usersidebar(props) {
  const { getStoredUserObj, logout, isLoggedIn } = useContext(AppContext)


  
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

  return (
    <nav className={`usersidebar ${isOpen ? 'open' : ''}`} id='usersidebar'>
        
        {/* <img className='navBarImg' src={logo} alt="Profile pixels" /> */}
      <ul>
        <li>
          <Link to="#" onClick={onClose} className='userdash' id='userdash'  title='close sidebar'>
          <svg xmlns="http://www.w3.org/2000/svg" className='dashicon' width='30' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9a9 9 0 0 0-9 9a9 9 0 0 0 9 9zM9 8l6 8m0-8l-6 8"/></svg>
          </Link>
        </li>
        
        <li className='linkNot'>
          {"GREETINGS"}
          <br />
            { namex }
        </li>
      </ul>

    <div className="UserSideBareScroll">
      <ul>
        <li>
          <Link to="./feeds" onClick={onClose}>
            Feeds
          </Link>
        </li>

        <li>
          <Link to="./userprofile" onClick={onClose}>
            My-Profile
          </Link>
        </li>

        
        <li>
          <Link to="./allcourses" onClick={onClose}>
            All-Courses
          </Link>
        </li>

        <li>
          <Link to="./prefferdcourses" onClick={onClose}>
            Prefferd-Courses
          </Link>
        </li>

        <li>
          <Link to="./enrolledcourses" onClick={onClose}>
          Enrrolled-Courses
          </Link>
        </li>
        
        

        <li>
          <Link to="./usersupport" onClick={onClose}>
            Support
          </Link>
        </li>
        {
         isLoggedIn() && getStoredUserObj().role === 'admin' &&
          (
          <li>
            <Link to="/Admin" onClick={onClose}>
              Admin-Dashboard
            </Link>
          </li>
          )
        }

    </ul>
  </div>
    <ul>

         <li onClick={ handleLogout } >
         <Link >
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};