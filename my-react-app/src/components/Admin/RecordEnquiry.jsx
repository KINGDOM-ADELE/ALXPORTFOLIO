import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom"


// import './myinfo.css'
import '../General/myinfo.css'
import { useNavigate } from 'react-router-dom';


export function RecordEnquiry() {
  const { API_base_url, getStoredToken, setPageTitle } = useContext(AppContext)
  const navigate = useNavigate();

  
  useEffect(() => {
    if(!getStoredToken()){
      navigate(`/`)
    }

    setPageTitle('RECORD ENQUIRY')
    return () => {
    };
  }, [ setPageTitle, navigate, getStoredToken ]);


  const refreshPage = () => {
    window.location.reload(false);
  }
  
  const [isLoading, setIsLoading] = useState(false);
  const [myformData, setMyFormData] = useState({
    fullName: '', 
    enquirerEmail: '', 
    enquirerPhone: '', 
    beneficiaryName: '', 
    relationship: '',
    phone: '', 
    Email: '', 
    description: '', 
    conclusion: ''
  });




  const handleChange = (event) => {
    setMyFormData({...myformData, [event.target.name]: event.target.value });
  };


  const validateForm = () => {

    const {fullName, enquirerEmail, enquirerPhone, relationship, phone, beneficiaryName, Email, description, conclusion } = myformData;
    if ( !fullName|| !enquirerEmail || !enquirerPhone || !description || !phone || !beneficiaryName || !relationship  || !Email || !conclusion ) {
      Swal.fire('Please fill in all required fields.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    
    try {
        const response = await fetch(`${API_base_url}api/v1/enquiries`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`
            },
            body: JSON.stringify(myformData),
          });

          const data = await response.json();
          if(data.status === 'success'){
            Swal.fire('Enquiry recorded successfully');
            navigate(`/admin/enquiries`)
          }
          else{
            throw Error(data.message)
          }

    } catch (error) {
      // Handle any errors
      console.error('Creation failed:', error);
      Swal.fire('Course creation failed; '+error);

      
    }
    setIsLoading(false);
  };
   
  return <>


    <div className="just_a_container">
      <div className="main_flex_container ">
        <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
            <span  title='Back to enquiries'>
              <Link to="/admin/enquiries"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
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
        <h3 className="centerMe ">ADMIN RECORD ENQUIRY</h3>
            
            <form id="mobileWidth" onSubmit={handleSubmit}>
              <br />
            <label><b>ENQUIRER</b></label>

                <div className='firstrow'>
                    <div className='input-box'>
                        <input
                        type='text'
                        name='fullName'
                        value={myformData.fullName}
                        onChange={handleChange}
                        required
                        />
                        <label>Full Name*</label>
                    </div>

                    <div className='input-box'>
                        <input
                        type='email'
                        name='enquirerEmail'
                        value={myformData.enquirerEmail}
                        onChange={handleChange}
                        required
                        />
                        <label>Email*</label>
                    </div>



                    <div className='input-box'>
                        <input
                        type='tel'
                        name='enquirerPhone'
                        value={myformData.enquirerPhone}
                        onChange={handleChange}
                        required
                        />
                        <label>Phone*</label>
                    </div>
                </div>


                <br />

                <label><b>BENEFICIARY</b></label>

                <div className='firstrow'>

                    <div className='input-box'>
                        <input
                        type='text'
                        name='beneficiaryName'
                        value={myformData.beneficiaryName}
                        onChange={handleChange}
                        required
                        />
                        <label>Full Name*</label>
                    </div>

                    <div className='input-box'>
                        <input
                        type='text'
                        name='relationship'
                        value={myformData.relationship}
                        onChange={handleChange}
                        required
                        />
                        <label>Relationship*</label>
                    </div>

                    <div className='input-box'>
                        <input
                        type='email'
                        name='Email'
                        value={myformData.email}
                        onChange={handleChange}
                        required
                        />
                        <label>Email*</label>
                    </div>
                    <div className='input-box'>
                        <input
                        type='tel'
                        name='phone'
                        value={myformData.phone}
                        onChange={handleChange}
                        required
                        />
                        <label>Phone*</label>
                    </div>
                </div>



                <br />
            <label><b>ENQUIRY AND CONCLUSION DETAILS</b></label>
                <div className='input-box'>
                  <textarea
                      name='description'
                      value={myformData.description}
                      onChange={handleChange}
                      rows="4"
                      required
                      ></textarea>
                  <label>description*</label>
                </div>

  
                <div className='input-box'>
                  <textarea
                      name='conclusion'
                      value={myformData.conclusion}
                      onChange={handleChange}
                      rows="4"
                      required
                      ></textarea>
                  <label>Conclusion*</label>
                </div>



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