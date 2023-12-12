import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';

export function AddCourse() {
    const { API_base_url, setPageTitle, getStoredToken} = useContext(AppContext)
    const [apiReturnedData, setApiReturnedData] = useState([]);
    const [renderProcessedApiReturnedData, setRrenderProcessedApiReturnedData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let tempFetchData  = useRef( )
    
    useEffect(() => {
        setPageTitle('ADD COURSE')
        return () => {
        };
    }, [ setPageTitle ]);


      
    const fetchData = async () => {
    setIsLoading(true)
    let url = `${API_base_url}api/v1/courses`
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


    
    useEffect(() => {
        // this should render all available courses with a button to add/remove attached to a post request using the api
        // ${API_base_url}api/v1/feeds

        
        let processed = "No records yet"
        apiReturnedData.length > 0 && (processed = apiReturnedData.map((data) => {
        //
        return(
        <div className='' key={data._id}>
            {data.firstName}

        </div>
        )
        //
        })
        )
        setRrenderProcessedApiReturnedData(processed)
        return () => {
        };
    }, [ apiReturnedData ]);  



    return (
        <>

        <div className="myheader">
            <h2>ADD COURSE</h2>
        </div>

        <div >
            {isLoading ? (
              <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>
            ) : (
            renderProcessedApiReturnedData
            )
            }
        </div>

        </>
        
    )
}