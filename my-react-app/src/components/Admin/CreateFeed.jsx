import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import {Link, useNavigate} from "react-router-dom"

// import './myinfo.css'

export function CreateFeed() {
  const { API_base_url, getStoredToken, setPageTitle } = useContext(AppContext)
  const navigate = useNavigate();
  

  useEffect(() => {
    if(!getStoredToken()){
      navigate(`/`)
    }

    setPageTitle('CREATE FEED')
    return () => {
    };
  }, [ setPageTitle, navigate, getStoredToken ]);


  const refreshPage = () => {
    window.location.reload(false);
  }
  
  const [isLoading, setIsLoading] = useState(false);
  const [myformData, setMyFormData] = useState({
    header: '',
    message: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // console.log('event.target.files[0]')
    // console.log(event.target.files[0])
  };

  const handleChange = (event) => {
    setMyFormData({...myformData, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);


    const validateForm = () => {
      // Perform basic form validation
      const { header, message, files } = myformData;
      if (!header ) {
        Swal.fire('Please, header field is required.');
        return false;
      }
      if (!message && !files ) {
        Swal.fire('Please, at least one more field is required.');
        return false;
      }
  
      return true;
    };

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }


    const formData = new FormData();
    if (selectedImage != null){ formData.append('files', selectedImage); }
    formData.append('message', myformData.message);
    formData.append('header', myformData.header);
    console.log(formData)

  

    try {
        const response = await fetch(`${API_base_url}api/v1/feeds`, {
            method: 'POST',
            headers: {
              // 'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`
            },
            body: formData,
          });

          const data = await response.json();
          if(data.status === 'success'){
            console.log('data.data')
            console.log(data.data)
            Swal.fire('Feed created successfully');
            navigate(`/admin/feeds`)
          }
          else{
            throw Error(data.message)
          }

    } catch (error) {
      // Handle any errors
      console.error('Creation failed:', error);
      Swal.fire('Feed creation failed; '+error);

      
    }
    setIsLoading(false);
  };
   
  return <>


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

    <div className="main_flex_container ">
      <div className="flexedContainer myspans " id='Overideflexdirection1Tocol' >
          
        <div className="regwrapper" >
        <h3 className="centerMe ">ADMIN CREATE FEED</h3>
            
            <form id="mobileWidth" onSubmit={handleSubmit}>
              
            <label htmlFor="header">Header:</label>
            <br />

              <input
                type="text"
                id="header"
                className='topicInmput'
                name="header"
                value={myformData.header}
                onChange={handleChange}
                required
              />
              <br />

                <label htmlFor="message">Message:</label>
              <br />
              <textarea
                id="message"
                name="message"
                className='textarea'
                value={myformData.message}
                onChange={handleChange}
                rows="6"
                cols="50"
                required
              ></textarea>
              <br />
              <br />

            
              <label>Files</label>

              <input
              type="file"
              name="file"
              onChange={handleImageUpload}

              />

              <br />
              <br />
                <button type='submit' className='butn' disabled={isLoading} required>
                {isLoading ? (
                    <BeatLoader color='#ffffff' loading={isLoading} size={8} />
                ) : (
                    'Submit'
                )}
                </button>
            </form>
        </div>
      </div>
    </div>
  </>
}