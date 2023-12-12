import { useContext, useEffect, useRef, useState} from 'react';
import { AppContext } from '../../Context/App_Context';
import {Link, useNavigate} from "react-router-dom"
// import './profileinfo.css';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';

export function AdminviewFeed() {
  // The props is returned if admin wants to view a user profile
  // and it is used as a condition to conditionally render user profile to suit admin and user
  const { API_base_url, setPageTitle, getStoredToken, formatTimestamp } = useContext(AppContext);
  const [renderProcessedData, setRrenderProcessedData] = useState('');
  const navigate = useNavigate();
 


  const [isLoading, setIsLoading] = useState(false);


  let targetfeedId = useRef('null')
  let tempFetchData = useRef({})





  useEffect(() => {
    setPageTitle('VIEW FEED ');
    return () => {};
  }, [setPageTitle]);

  const refreshPage = () => {
    window.location.reload(false);
  }

  const HandleParams = () => {
    let params = (new URL(document.location)).searchParams;
    targetfeedId.current = params.get('targetfeedId');
  }
  HandleParams()

  
  const fetchData = async () => {
    let response
    setIsLoading(true)
    let url = `${API_base_url}api/v1/feeds/${targetfeedId.current}`
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
        data.data && (handleRrenderProcessedData(data.data))
        console.log('data.data')
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
    return response
  }


  
  tempFetchData.current = fetchData
  useEffect(() => {
    tempFetchData.current()
    return () => {
    };
  }, [ ]); 


    const handleDelete = async () => {
      try {
          const response = await fetch(`${API_base_url}api/v1/feeds/${targetfeedId.current}`, {
              method: 'DELETE',
              headers: {
                // 'Content-Type': 'application/json',
                'authorization': `Bearer ${getStoredToken()}`
              },
              // body: formData,
            });
  
            const data = await response.json();
            if(data.status === 'success'){
              Swal.fire('Feed deleted successfully');
              navigate(`/admin/feeds`)
            }
            else{
              Swal.fire('Feed deleted failed');
            }
  
      } catch (error) {
        // Handle any errors
        console.error('Delete failed:', error);
      }
      setIsLoading(false);
    };


  const handleRrenderProcessedData = async (data) => {

    let feedImage = '';
    if (data.files && data.files.length > 0) {
      // Assuming you want to display the first image from the files array
      feedImage = <img style={{ width: '100%' }} src={API_base_url+data.files[0].filePath} alt="feeds pixels" />;
    }
  
    let processed = (

      <div className="main_flex_container ">
      <div className="flexedContainer myspans " id='Overideflexdirection1Tocol' >
    
      <div className=" regwrapper" >

  
          <h3>{ data.header }</h3>

          <p>By: { data.createdBy.firstName } { data.createdBy.middleName } { data.createdBy.lastName }</p>
          <p>Date:   <span className="message-timestamp">
                      {formatTimestamp(data.releaseDate)}
                    </span>
          </p>

          <div>{ feedImage  } <br/> { data.message }</div>
          <button onClick={handleDelete}>delete</button>
    
      </div>
      </div>
      </div>

    
  
    )

    setRrenderProcessedData(processed)
    return processed
  }



    return (<>
      
      <div className="just_a_container">
      <div className="main_flex_container ">
        <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
            <span  title='Back to feeds'>
              <Link to="/admin/feeds"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
            </span>

            <span onClick={refreshPage} title='Refresh'>
                <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="-1.5 -2.5 24 24"><path fill="currentColor" d="m17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194zM2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792a1 1 0 1 1 1.906.608a9.381 9.381 0 0 1-5.38 5.831a9.386 9.386 0 0 1-11.265-3.328z"/></svg>
            </span>
        </div>
      </div>
    </div>


        {isLoading ?  <h3 className=" centerMe" ><BeatLoader color='green' loading={isLoading} size={8} /> </h3> : renderProcessedData}


      </>
    )
  }
  
  
  