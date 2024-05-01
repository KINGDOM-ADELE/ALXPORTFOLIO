import React, { useContext, useState, useEffect } from 'react';
import './userimg.css'
import { AppContext } from '../../Context/App_Context';
import {Link} from "react-router-dom"
import Swal from 'sweetalert2';
// import axios from 'axios';


export function ChangeProfileImage() {
  const { API_base_url, setPageTitle, getStoredToken, StoreUserObj } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CHANGE PROFILE IMAGE')
    return () => {
    };
  }, [ setPageTitle ]);
  

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // console.log('event.target.files[0]')
    // console.log(event.target.files[0])
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      try {
        
        const formData = new FormData();
        formData.append('file', selectedImage);
        console.log('formData')
        console.log(formData)

        let headerObj = {
          // method: 'PATCH',
          method: 'PATCH',
          headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${getStoredToken()}`
            
          },
          body: formData,
        }
        const response = await fetch(`${API_base_url}api/v1/files/linkprofileimage`, headerObj);
        const data = await response.json();
        if (response.ok) {
          data.data && StoreUserObj(data.data)
          Swal.fire('UPLOAD SUCCESSFUL');
          // alert('UPLOAD SUCCESSFUL');
        } else {
          console.error('Image upload failed');
        }
        
        // axios.post(`${API_base_url}api/v1/files/linkprofileimage`, formData, {'authorization': `Bearer ${getStoredToken()}`} )
        // .then(response => { // then print response status
        //     console.log('Image uploaded successfully');
        //     if (response.ok) {
        //       console.log('Image uploaded successfully');
        //     } else {
        //       console.error('Image upload failed');
        //     }
        // })


      } catch (error) {
        // Handle any error during the upload process
        console.error('Error during image upload:', error);
      }
    }
  };


  return (
    <div className="user-dashboard">

    <div className="just_a_container"> 
		<div className="main_flex_container ">
      
        <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
        <span  title='Change profie image'>
                    <Link to="../changeprofileimage"><svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 8h.01M11 20H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4"/><path d="m4 15l4-4c.928-.893 2.072-.893 3 0l3 3m0 0l1-1c.31-.298.644-.497.987-.596m2.433 3.206a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3l3.42-3.39z"/></g></svg></Link>
                  </span>

                  <span title='Edit profile'> 
                    <Link to="../profileupdate"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"/></g></svg></Link>            
                  </span>
        </div>


		</div>
		</div>

    <div className="main_flex_container ">
        <div className="flexedContainer myspans " id='Overideflexdirection1Tocol' >
      <div className='infocontent '>
        <div className="info-container ">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="file"
                onChange={handleImageUpload}
              />
              <button type="submit">Upload</button>
            </form>
            {selectedImage ? (
              <div>
                <h3>Preview</h3>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className='infomainimg' />
              </div>
            ) : (
              <p className='error'>No file selected for upload.</p>
            )}
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}