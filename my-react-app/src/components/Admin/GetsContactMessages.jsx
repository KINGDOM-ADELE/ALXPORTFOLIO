import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
// import './YourComponent.css'; // Add your custom styles here
import { AppContext } from '../../Context/App_Context';

export function GetContactMessages() {
  const { API_base_url, setPageTitle, getStoredToken } = useContext(AppContext);
  const [renderProcessedData, setRenderProcessedData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let targetfeedId = useRef('null');

  useEffect(() => {
    setPageTitle('CONTACT MESSAGES');
  }, [setPageTitle]);



  // const HandleParams = () => {
  //   let params = new URLSearchParams(document.location.search);
  //   targetfeedId.current = params.get('targetfeedId');
  // }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_base_url}api/v1/contactmessages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
      });
      const data = await response.json();
      if (data.status === 'success') {
        handleRenderProcessedData(data.data);
      } else {
        throw Error(`Could not fetch the data for that resource, ${data.message}`);
      }
    } catch (error) {
      Swal.fire(error.message);
      console.error('Request failed:', error);
    }
    setIsLoading(false);
  }

  let tempFetchData = useRef({});
  tempFetchData.current = fetchData
  useEffect(() => {
    tempFetchData.current();
  }, [setPageTitle]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_base_url}api/v1/feeds/${targetfeedId.current}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${getStoredToken()}`
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        Swal.fire('Message handled successfully');
        navigate('/admin/contactmessages');
      } else {
        Swal.fire('Feed deleted failed');
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
    setIsLoading(false);
  };

  const handleRenderProcessedData = (datax) => {
    const processedData = datax.length > 0 ? datax.map((data) => (
      <div className="message-container" key={data._id}>
        <p><b>Email:</b> {data.email}</p>
        <p><b>Phone:</b> {data.phone}</p>
        <p>{data.message}</p>
        <span>{data.releaseDate}</span>
        <button onClick={handleDelete}>Handled</button>
      </div>
    )) : <h3 className="centerMe myspans">No records yet!</h3>;

    setRenderProcessedData(<>
      <div className="main_flex_container ">
      <div className="flexedContainer myspans " id='Overideflexdirection1Tocol' >
      {processedData}
      </div>
      </div>
      </>
      );
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div className="just-a-container">
      <div className="main_flex_container">
        <div className="son3x myspans" id='Overideflexdirection1ToRow'>
          <span title='Back to stats'>
            <Link to="/admin/stats">
              <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/>
              </svg>
            </Link>
          </span>
          <span onClick={refreshPage} title='Refresh'>
            <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="-1.5 -2.5 24 24">
              <path fill="currentColor" d="m17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194zM2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792a1 1 0 1 1 1.906.608a9.381 9.381 0 0 1-5.38 5.831a9.386 9.386 0 0 1-11.265-3.328z"/>
            </svg>
          </span>
        </div>
      </div>
      {isLoading ? <h3 className="centerMe"><BeatLoader color='green' loading={isLoading} size={8} /></h3> : renderProcessedData}
    </div>
  );
}
