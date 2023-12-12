import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import {Link, useNavigate} from "react-router-dom"

// import './myinfo.css'

export function GetFeeds() {
  const { API_base_url, setPageTitle, getStoredToken,formatTimestamp} = useContext(AppContext)
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
    navigate(`/admin/adminviewfeed?targetfeedId=${targetFeedId}`)
  }

  tempHandleViewFeed.current = handleViewFeed
  const handleProcessData = (targetData) => {
    // let processed = <h3 className="son3x  myspans Overideflexdirection1ToRow centerMe" >No records yet!</h3>
    let processed = <h3 className="mygridspans centerMe " >No records yet!</h3>

    targetData.length > 0 && (processed = targetData.map((data) => {
    console.log(data)
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
        console.log('all feeds')
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
                  <span role="button" title='Create new feed'> 
                    <Link to="../createfeed">
                      <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer' viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"/></svg>
                    </Link>            
                  </span>
                  <input type="text" name='search' className="searchinput cursorText margin5pxRight margin5pxleft" placeholder='Search feeds by key words' value={search} onChange={(e) => setSearch(e.target.value)} required />
                  <span title='Search' onClick={ handleSearch }> 
                    <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer'  viewBox="0 0 17 13"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.92" cy="5.92" r="5.42"/><path d="M13.5 13.5L9.75 9.75"/></g></svg>
                  </span>
                </>
            </div>
          </div>

          


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

  </>)
}
