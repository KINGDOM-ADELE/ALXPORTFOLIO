import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
// import {Link, useNavigate} from "react-router-dom"

// import './myinfo.css'

export function Feeds() {
  const { API_base_url, setPageTitle, getStoredToken, formatTimestamp} = useContext(AppContext)
  const [apiReturnedData, setApiReturnedData] = useState([]);
  const [renderProcessedApiReturnedData, setRrenderProcessedApiReturnedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingg, setIsLoadingg] = useState(false);
  let tempFetchData  = useRef( )
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  let tempHandleViewFeed  = useRef( )
  
  useEffect(() => {
    setPageTitle('FEEDS')
    return () => {
    };
  }, [ setPageTitle ]);


  const handleViewFeed = (targetFeedId) => {
    navigate(`/user/viewfeed?targetfeedId=${targetFeedId}`)
  }

  tempHandleViewFeed.current = handleViewFeed
  const handleProcessData = (targetData) => {
    // let processed = <h3 className="son3x  myspans Overideflexdirection1ToRow centerMe" >No records yet!</h3>
    let processed = <h3 className="mygridspans centerMe " >No records yet!</h3>

    targetData.length > 0 && (processed = targetData.map((data) => {
    return(<>
 
      <div className="spills "  onClick={() => tempHandleViewFeed.current(data._id) } title='View this feed'  >
      <p>  <span><b>{data.header}</b> </span></p>

      <span className="message-timestamp">
          {formatTimestamp(data.releaseDate)}
        </span>
      </div>
    </>
    )
    })
    )
    return(processed)
    }

  // THE SEARCH STARTS
  const fetchSearchData = async () => {
    setIsLoading(true)


    let url = `${API_base_url}api/v1/enquiries/searchenquiries?search=${search}`
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
        data.data && setRrenderProcessedApiReturnedData(handleProcessData(data.data))
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


  const handleSearch = async (e) => {
    e.preventDefault();
    fetchSearchData()
  }
  // THE SEARCH ENDS

  const refreshPage = () => {
    window.location.reload(false);
  }

  
  const fetchData = async () => {
    setIsLoading(true)
    let url = `${API_base_url}api/v1/feeds`
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


  let tempHandleProcessData  = useRef( )
  let tempSetRrenderProcessedApiReturnedData  = useRef( )
  tempHandleProcessData.current = handleProcessData
  tempSetRrenderProcessedApiReturnedData.current = setRrenderProcessedApiReturnedData
  useEffect(() => {
    setRrenderProcessedApiReturnedData(tempHandleProcessData.current(apiReturnedData))
    return () => {
    };
}, [ apiReturnedData]);
   

  return (<>
    <div className="just_a_container">
      <div className="myheader">
        <div className="just_a_container">
          
          <div className="main_flex_container ">
            <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
                <>
                    <span onClick={refreshPage} title='Refresh'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="-1.5 -2.5 24 24"><path fill="currentColor" d="m17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194zM2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792a1 1 0 1 1 1.906.608a9.381 9.381 0 0 1-5.38 5.831a9.386 9.386 0 0 1-11.265-3.328z"/></svg>
                    </span>

                    <input type="text" name='search' className="searchinput cursorText margin5pxRight margin5pxleft" placeholder='Search feeds by key words' value={search} onChange={(e) => setSearch(e.target.value)} required />
                    
                    <span title='Search' onClick={ handleSearch }> 
                        <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer'  viewBox="0 0 17 13"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.92" cy="5.92" r="5.42"/><path d="M13.5 13.5L9.75 9.75"/></g></svg>
                    </span>
                </>
            </div>
          </div>

          

          <div className="just_a_container">
          {isLoading ? (
                <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>
            ) : (

                <div class="gridContainer ">
                  {renderProcessedApiReturnedData}
                </div>
         
            )
          } 

        </div>
        </div>
      </div>
    </div>

  </>)
}
