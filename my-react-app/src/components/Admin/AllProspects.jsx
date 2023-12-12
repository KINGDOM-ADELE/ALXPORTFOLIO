import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import {Link} from "react-router-dom"


export function AllProspects() {
  const { API_base_url, setPageTitle, getStoredToken} = useContext(AppContext)
  const [apiReturnedData, setApiReturnedData] = useState([]);
  const [renderProcessedApiReturnedData, setRrenderProcessedApiReturnedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let tempFetchData  = useRef( )
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    setPageTitle('PROSPECTS')
    return () => {
    };
  }, [ setPageTitle ]);




const handleProcessData = (targetData) => {
  let processed = <h3 className="son3x  myspans Overideflexdirection1ToRow centerMe" >No records yet!</h3>
  targetData.length > 0 && (processed = targetData.map((data) => {
  
  return(<>
    <div className=" myspans ">
  
        <div class="flex_container9">
          <div class="son9 son19">
              <p><strong>DATE:</strong> {data.created} </p>
              <p><em>ENQUIRER: </em></p>
              <p><strong>FULL NAME:</strong> {data.fullName} </p>
              <p><strong>Phone:</strong> <a target='_blank' rel="noreferrer"  href={'tel:'+data.enquirerPhone} >{data.enquirerPhone}</a></p>
              <p><strong>EMAIL:</strong> <a target='_blank' rel="noreferrer"  href={'mailto:'+data.enquirerEmail} >{data.enquirerEmail}</a> </p>
          </div>
          <div class="son9 son29">
              <p><em>ON BEHALF OF</em></p>
              <p><strong>NAME:</strong> {data.beneficiaryName} </p>
              <p><strong>RELATIONSHIP:</strong> {data.relationship} </p>
              <p><strong>Phone:</strong> <a target='_blank' rel="noreferrer"  href={'tel:'+data.phone} >{data.phone}</a></p>
              <p><strong>EMAIL:</strong> <a target='_blank' rel="noreferrer"  href={'mailto:'+data.Email} >{data.Email}</a> </p>
          </div>
        </div>
        <div class="flex_container9">
          <div class="son9 son19">
              <p><strong>DESCRIPTION: </strong> {data.description}</p>
          </div>
          <div class="son9 son29">
              <p><strong>CONCLUSION: </strong> {data.conclusion} </p>
          </div>
        </div>
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
let url = `${API_base_url}api/v1/enquiries?prospect=true`
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




useEffect(() => {
setRrenderProcessedApiReturnedData(handleProcessData(apiReturnedData))
return () => {
};
}, [ apiReturnedData ]);


return (<>
<div className="just_a_container">
<div className="myheader">
  <div className="just_a_container">
    
    <div className="main_flex_container ">
      <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
          <>
            <span role="button" title='New enquiry'> 
              <Link to="../recordenquiry">
                <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer' viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"/></svg>
              </Link>            
            </span>
            <input type="text" name='search' className="searchinput cursorText margin5pxRight margin5pxleft" placeholder='Search enquiry by email, name or phone' value={search} onChange={(e) => setSearch(e.target.value)} required />
            <span title='Search' onClick={ handleSearch }> 
              <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer'  viewBox="0 0 17 13"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.92" cy="5.92" r="5.42"/><path d="M13.5 13.5L9.75 9.75"/></g></svg>
            </span>
          </>
      </div>
    </div>

    


    {isLoading ? (
          <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>
      ) : (
        <div className="just_a_container">
          <div className="main_flex_container ">
            {renderProcessedApiReturnedData}
          </div>
        </div>
      )
    } 

  </div>
</div>
</div>

</>)
}