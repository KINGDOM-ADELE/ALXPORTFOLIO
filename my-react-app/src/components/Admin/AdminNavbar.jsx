import { Adminsidebar } from './Adminsidebar';
import { useState, useContext } from 'react';
import './adminavbar.css'
import { AppContext } from '../../Context/App_Context';
import { useNavigate } from 'react-router-dom';

export function AdminNavbar() {
    // const { getStoredUserObj, profileImage, pageTitle } = useContext(AppContext)
    const { API_base_url, profileImage, pageTitle, isLoggedIn } = useContext(AppContext)

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    const handleProfileImgRedirect = () => {
        navigate(`./myprofile`)
    }

    const handleBackPathRedirect = () => {
        navigate(`./`)
    }

    // let NavTitile = `${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`
    let NavTitile = pageTitle

    // let userImage = <Icon icon="mdi:user-circle" className='usernavicon' width='30' alt="Icon"  />
    let userImage = <svg xmlns="http://www.w3.org/2000/svg" className='usernavicon cursorPointer' viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"/></svg>
    
    if(isLoggedIn() && profileImage() !== undefined){
      userImage = <img className='navBarImg cursorPointer' src={API_base_url+profileImage()} alt="Profile pixels" />
    }

    let back = <svg xmlns="http://www.w3.org/2000/svg"  className='usernavicon cursorPointer' width='30' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg>



  return (<>
    <Adminsidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    <header className='adminnavHeader'>
       
      <li onClick={toggleSidebar} className='toggle cursorPointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className='usernavicon cursorPointer' viewBox="0 0 24 24"><path fill="currentColor" d="M20 15H4v-2h16v2zm0 2H4v2h16v-2zm-5-6l5-3.55V5l-5 3.55L10 5L4 8.66V11l5.92-3.61L15 11z"/></svg>
      </li>

  
      <li className='toggle'>
          {NavTitile}
      </li>
      
  
      <li className='toggle'>
        <span onClick={handleBackPathRedirect} className='gobackpad cursorPointer' title='back to stats'>
            { back }
        </span>
        <span onClick={handleProfileImgRedirect} >
            { userImage }
        </span>
      </li>
  
  </header>
  </>)
}