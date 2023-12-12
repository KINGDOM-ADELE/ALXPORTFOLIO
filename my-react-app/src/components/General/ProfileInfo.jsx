import { useContext, useEffect, useRef, useState} from 'react';
import { AppContext } from '../../Context/App_Context';
import {Link} from "react-router-dom"
import './profileinfo.css';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';

export function ProfileInfo(props) {
  // The props is returned if admin wants to view a user profile
  // and it is used as a condition to conditionally render user profile to suit admin and user
  const { API_base_url, setPageTitle, getStoredUserObj, getStoredToken } = useContext(AppContext);
  const [renderProcessedData, setRrenderProcessedData] = useState('');
  const [apiReturnedData, setApiReturnedData] = useState([]);


  const [isLoading, setIsLoading] = useState(false);


  let tempHandleRrenderProcessedData = useRef({} )
  let tempGetStoredUserObj = useRef( )
  let tempFetchData  = useRef( )



  useEffect(() => {
    setPageTitle('PROFILE INFO');
    return () => {};
  }, [setPageTitle]);


  const fetchData = async () => {
    let response
    setIsLoading(true)
    let url = `${API_base_url}api/v1/users/${props.targetUserId}`
    try {
      response = await fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
        // body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.status === 'success'){
        response = data.data
        setIsLoading(false)
      }
      else{
        setIsLoading(false)
        throw Error('could not fetch the data for that resource, '+data.message)
      }
      
    } catch (error) {
      // Handle any errors
      Swal.fire(error)
      console.error('Request failed:', error);
    }
    return response
  }




  const HandleApproveUserAcess = async (action) => {
    let response
    setIsLoading(true)
    let url = `${API_base_url}api/v1/users/approve/${props.targetUserId}?action=${action}`
    try {
      response = await fetch(url , {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
        // body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.status === 'success'){
        console.log('data.data')
        console.log(data.data)
        response = data.data
        data.data && setApiReturnedData(data.data)
        setIsLoading(false)
      }
      else{
        setIsLoading(false)
        throw Error('could not fetch the data for that resource, '+data.message)
      }
      
    } catch (error) {
      // Handle any errors
      Swal.fire(error)
      console.error('Request failed:', error);
    }
    return response
  }



  const handleRrenderProcessedData = async (userObject) => {
      let userImage = <svg xmlns="http://www.w3.org/2000/svg" className='profileimg' viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"/></svg>

      if(userObject.profileImg && userObject.profileImg.filePath !== undefined){
          userImage = <img className='userprofileImg' src={API_base_url+userObject.profileImg.filePath} alt="Profile pixels" />
      }

      let approveCondition 
      if(props.targetUserId){
        if(userObject.approved === false){
          approveCondition = <span  title='Approve user, unlock user access' onClick={() => HandleApproveUserAcess('approveTrue') }>
            <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><rect width="24" height="18" x="12" y="20" rx="2"/><path stroke-linecap="round" d="M18 20v-6c0-3.682 2.686-6 6-6s6 2.318 6 6v6m-6 8v2M6 18v12m36-12v12"/></g></svg>
          </span>
        }else{
          approveCondition = <span  title='User Approved, user access unlocked, click to block' onClick={() => HandleApproveUserAcess('approveFalse') }>
            <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><rect width="24" height="18" x="12" y="20" rx="2"/><path stroke-linecap="round" d="M18 20v-6c0-3.682 2.686-6 6-6c1.85 0 3.503.722 4.604 2a5.62 5.62 0 0 1 1.102 2M24 28v2M6 18v12m36-12v12"/></g></svg>
          </span>
        }
      }
      else{
        // for normal users 
        if(userObject.approved === false){
          approveCondition = <span  title='Your Account is not approved, user access denied'>
            <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><rect width="24" height="18" x="12" y="20" rx="2"/><path stroke-linecap="round" d="M18 20v-6c0-3.682 2.686-6 6-6s6 2.318 6 6v6m-6 8v2M6 18v12m36-12v12"/></g></svg>
          </span>
        }else{
          approveCondition = <span  title='Your Account is approved, user access granted'>
            <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><rect width="24" height="18" x="12" y="20" rx="2"/><path stroke-linecap="round" d="M18 20v-6c0-3.682 2.686-6 6-6c1.85 0 3.503.722 4.604 2a5.62 5.62 0 0 1 1.102 2M24 28v2M6 18v12m36-12v12"/></g></svg>
          </span>
        }
      }

      let processed = (

        <div className="just_a_container">
        <div className="main_flex_container ">
          
            <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
              {props.targetUserId ? (
                <>
                  <span  title='Back to users'>
                    <Link to="/admin/users"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
                  </span>

                  <span  title='graduate user'>
                    graduate
                  </span>
                  <span  title='defer user'>
                    defer
                  </span>

                    {approveCondition}
                </>
              ) : (
                <>
                  <span  title='Change profie image'>
                    <Link to="../changeprofileimage"><svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 8h.01M11 20H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4"/><path d="m4 15l4-4c.928-.893 2.072-.893 3 0l3 3m0 0l1-1c.31-.298.644-.497.987-.596m2.433 3.206a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3l3.42-3.39z"/></g></svg></Link>
                  </span>
                  {approveCondition}

                  <span title='Edit profile'> 
                    <Link to="../profileupdate"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"/></g></svg></Link>            
                  </span>
                </>
              )
            } 


    
            </div>
            <div className="sonx son1x">
    
                <div> 
                {!isLoading &&  userImage } 
                </div>
            </div>
            <div className="sonx son2x" id='Overideflexdirection1Tocol'>
              <p ><b>Name:</b>  <span>{`${userObject.firstName.toUpperCase()} ${userObject.middleName.toUpperCase()} ${userObject.lastName.toUpperCase()}`}</span></p>
              <p><b>Role:</b>  <span>{`${userObject.role.toUpperCase()}`}</span></p>
              <p><b>Email:</b> <span>{`${userObject.email.toUpperCase()}`}</span></p>
              <p><b>Phone:</b> <span>{`${userObject.phone.toUpperCase()}`}</span></p>
            </div>
            <div className="sonx son3x" id='Overideflexdirection2Tocol'>
              <p><b>Adress:</b> <span>{`${userObject.address.toUpperCase()}`}</span></p>
            </div>
      
        </div>
        </div>
      
    
    )

    setRrenderProcessedData(processed)
    return processed
  }




  tempFetchData.current = fetchData
  tempGetStoredUserObj.current = getStoredUserObj
  tempHandleRrenderProcessedData.current = handleRrenderProcessedData
  useEffect(() => {
    if(props.targetUserId){
      const handleProcess = async () => {
        if(apiReturnedData.length > 0){
          tempHandleRrenderProcessedData.current(apiReturnedData)
        }else{   
          tempHandleRrenderProcessedData.current(await tempFetchData.current())
        }
      }
      handleProcess()
    }else{
      setIsLoading(true)
      tempHandleRrenderProcessedData.current(tempGetStoredUserObj.current())
      setIsLoading(false)
    };
    return () => {};
  }, [ props.targetUserId, apiReturnedData ]);



  return (
    <div className="myheader">
      {isLoading ?  <h3 className=" centerMe" ><BeatLoader color='green' loading={isLoading} size={8} /> </h3> : renderProcessedData}
	  </div>
  );
}
