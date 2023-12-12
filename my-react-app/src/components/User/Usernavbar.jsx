import { useState, useContext } from 'react';
import { Usersidebar } from './Usersidebar';
import { AppContext } from '../../Context/App_Context';
import { useNavigate } from 'react-router-dom';

export function Usernavbar() {
    // const { getStoredUserObj, profileImage, pageTitle } = useContext(AppContext)
    const { API_base_url, profileImage, pageTitle } = useContext(AppContext)

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileImgRedirect = () => {
    navigate(`./userprofile`)
  }

  const handleBackPathRedirect = () => { 
      navigate(`./`)
  }
  
  // let NavTitile = `${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`
  let NavTitile = pageTitle

  let back = <svg xmlns="http://www.w3.org/2000/svg" className='usernavicon' width='30' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg>


  let userImage = <svg xmlns="http://www.w3.org/2000/svg"  className='usernavicon' width='30' viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"/></svg>
  if(profileImage() !== undefined){
    // userImage = <img className='navBarImg' src={API_base_url+profileImage()} alt="Profile pixels" />
    userImage = <img className='navBarImg' src={API_base_url+profileImage()} alt="Profile pixels" />
  }


return (<>
  <Usersidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
  
  <header className='usernavHeader'>
     
    <li onClick={toggleSidebar} className='toggle'  title='open sidebar'>
        {/* <Icon icon="ic:outline-legend-toggle" width='30' className=' navicon' /> */}
        <svg xmlns="http://www.w3.org/2000/svg" className='usernavicon' viewBox="0 0 24 24"><path fill="currentColor" d="M20 15H4v-2h16v2zm0 2H4v2h16v-2zm-5-6l5-3.55V5l-5 3.55L10 5L4 8.66V11l5.92-3.61L15 11z"/></svg>
        
    </li>


    <li className='toggle'>
        { NavTitile }
    </li>
    

    <li className='toggle'>
        <span onClick={handleBackPathRedirect} className='gobackpad' title='back to feeds'>
            { back }
        </span>
        <span onClick={handleProfileImgRedirect} >
            { userImage }
        </span>
    </li>

</header>
</>)
}
