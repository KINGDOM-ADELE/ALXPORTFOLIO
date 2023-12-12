import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

// import './myinfo.css'

export function DefferedStudents() {
  const { API_base_url, setPageTitle, getStoredToken} = useContext(AppContext)
  const [apiReturnedData, setApiReturnedData] = useState([]);
  const [renderProcessedApiReturnedData, setRrenderProcessedApiReturnedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let tempFetchData  = useRef( )
  let tempHandleViewProfile  = useRef( )
  
  useEffect(() => {
    setPageTitle('DEFFERED STUDENTS')
    return () => {
    };
  }, [ setPageTitle ]);
   


  const fetchData = async () => {
    setIsLoading(true)
    let url = `${API_base_url}api/v1/users?status=deffered`
    try {
      const response = await fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
        // body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.status === 'success'){
        data.data && setApiReturnedData(data.data)
        console.log('active students')
        console.log(data.data)
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
  }


  tempFetchData.current = fetchData
  useEffect(() => {
    tempFetchData.current()
    return () => {
    };
  }, [ ]); 




  const handleViewProfile = (targetUserrId) => {
    navigate(`/admin/adminviewuserprofile?targetuserId=${targetUserrId}`)
  }

  tempHandleViewProfile.current = handleViewProfile
useEffect(() => {
    // this should render the Users, followed by a button to view profile
    // a click on the toptic should redirect to the url: /admin/adminviewuserprofile/${data._id} carrying the user id as data._id
    let processed = <h3 className="son3x  myspans Overideflexdirection1ToRow centerMe" >No records yet! </h3>
    apiReturnedData.length > 0 && (processed = apiReturnedData.map((data) => {
      let userImage = <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"/></svg>
      // let userImage = <img className='navBarImg' src={ require('../../../src/assets/img3.jpg') } alt="Profile pixels" />
      if(data.profileImg && data.profileImg.filePath !== undefined){
        userImage = <img  className='userbodyicon' src={data.profileImg.filePath} alt="Profile pixels" />
      } 
      return(
            <div className=" son3x  myspans Overideflexdirection1ToRow"   key={data._id}>
              <div>
                { userImage } 
              </div>
              <div>
                {data.firstName} {data.middleName} {data.lastName}
              </div>
              <div  onClick={() => tempHandleViewProfile.current(data._id) } title='View this user profile' >
              <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon'  viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"/><path fill="currentColor" d="M12 3.5c3.432 0 6.124 1.534 8.054 3.241c1.926 1.703 3.132 3.61 3.616 4.46a1.6 1.6 0 0 1 0 1.598c-.484.85-1.69 2.757-3.616 4.461c-1.929 1.706-4.622 3.24-8.054 3.24c-3.432 0-6.124-1.534-8.054-3.24C2.02 15.558.814 13.65.33 12.8a1.6 1.6 0 0 1 0-1.598c.484-.85 1.69-2.757 3.616-4.462C5.875 5.034 8.568 3.5 12 3.5ZM1.633 11.945a.115.115 0 0 0-.017.055c.001.02.006.039.017.056c.441.774 1.551 2.527 3.307 4.08C6.691 17.685 9.045 19 12 19c2.955 0 5.31-1.315 7.06-2.864c1.756-1.553 2.866-3.306 3.307-4.08a.111.111 0 0 0 .017-.056a.111.111 0 0 0-.017-.056c-.441-.773-1.551-2.527-3.307-4.08C17.309 6.315 14.955 5 12 5C9.045 5 6.69 6.314 4.94 7.865c-1.756 1.552-2.866 3.306-3.307 4.08Z"/></svg>
              </div>
            </div>
      )
    
    })
    )
    setRrenderProcessedApiReturnedData(processed)
    return () => {
    };
}, [ apiReturnedData ]); 
   
  return (<>
  
    <div >
      {isLoading ? (
           <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>
      ) : (
      
        <div className="just_a_container">
        <div className="main_flex_container centerMe">
        {renderProcessedApiReturnedData}
        </div>
      </div>
      )
      }
      </div>
  </>)
}