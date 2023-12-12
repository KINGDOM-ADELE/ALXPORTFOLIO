import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import {Link, useNavigate} from "react-router-dom"
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';



export function ProfileUpdate() {
    const { API_base_url, getStoredToken, getStoredUserObj, setPageTitle, StoreUserObj, logout } = useContext(AppContext)


    const navigate = useNavigate();

    useEffect(() => {
        if(!getStoredToken()){
          navigate(`/`)
        }

        setPageTitle('PROFILE UPDATE')
        return () => {
        };
      }, [ setPageTitle, navigate, getStoredToken  ]);


      const [isLoading, setIsLoading] = useState(false);
      const [formData, setFormData] = useState({
        firstName: getStoredUserObj().firstName,
        middleName: getStoredUserObj().middleName,
        lastName: getStoredUserObj().lastName,
        email: getStoredUserObj().email,
        phone: getStoredUserObj().phone,
        // password: '',
        // confirmPassword: '',
        gender: getStoredUserObj().gender, 
        address: getStoredUserObj().address
      });

      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value });
      };
    
      const validateForm = () => {
        // Perform basic form validation
        const { firstName, lastName, email, phone, gender } = formData;
        if (!firstName || !lastName || !email || !phone || !gender) {
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
            const response = await fetch(`${API_base_url}api/v1/users`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${getStoredToken()}`

                },
                body: JSON.stringify(formData),
              });
    
              const data = await response.json();
              if(data.status === 'success'){
                data.data && StoreUserObj(data.data)
                Swal.fire('Profile update successful');
              }
              else{
                Swal.fire('Profile update failed');
              }

        } catch (error) {
          // Handle any errors
          console.error('Registration failed:', error);
        }
        setIsLoading(false);
      };



      const [isLoadingx, setIsLoadingx] = useState(false);
      const [passwordChangeFormData, setPasswordChangeFormData] = useState({
        oldpassword: '',
        password: '',
        confirmPassword: '',
      });
    
      const handleChangePass = (event) => {
        setPasswordChangeFormData({...passwordChangeFormData, [event.target.name]: event.target.value });
      };

      const validatePasswordForm = () => {
        // Perform basic form validation
        const { oldpassword, password, confirmPassword } = passwordChangeFormData;
        if ( !oldpassword || !password || !confirmPassword) {
          Swal.fire('Please fill in all required fields.');
          return false;
        }
        if (password !== confirmPassword) {
          Swal.fire('Passwords do not match.');
          return false;
        }
        return true;
      };
    
      const handleSubmitPasswordForm = async (event) => {
        event.preventDefault();
        setIsLoadingx(true);
    
        if (!validatePasswordForm ()) {
          setIsLoadingx(false);
          return;
        }
    
        try {
          const response = await fetch(`${API_base_url}api/v1/users/changePassword`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`

            },
            body: JSON.stringify(passwordChangeFormData),
          });
    
          const data = await response.json();
          if(data.status === 'success'){
            console.log('data.data');
            console.log(data.data);

            logout()
            Swal.fire('Password updated successfully, please login with the new password');
            setIsLoadingx(false);
            navigate(`/`)

          }
          else{
            Swal.fire('Password update failed '+data.message);

            setIsLoadingx(false);

          }
    
        } catch (error) {
          // Handle any errors
          console.error('Registration failed:', error);
        }
        setIsLoadingx(false);
      };
    



      
      const [isLoadingy, setIsLoadingy] = useState(false);

      const handleLogOutAll = async (event) => {
        event.preventDefault();
        setIsLoadingy(true);
    
        try {
          const response = await fetch(`${API_base_url}api/v1/users/logoutall`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`
            }
          });
    
          const data = await response.json();
          if(data.status === 'success'){

            logout()
            Swal.fire('You have been logged out from all devices');
            setIsLoadingy(false);
            navigate(`/`)

          }
          else{
            Swal.fire('Logout all failed '+data.message);
            setIsLoadingy(false);

          }
    
        } catch (error) {
          console.error('Logout all failed:', error);
        }
        setIsLoadingy(false);
      };



    return (
        <div className="myheader">
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
                    
                    <div className=" regwrapper" >
                    <h3 className="centerMe ">PROFILE INFO UPDATE</h3>
                        
                        <form id="mobileWidth" onSubmit={handleSubmit}>
                            <div className='firstrow'>
                                <div className='input-box'>
                                    <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    />
                                    <label>First-name*</label>
                                </div>

                                <div className='input-box'>
                                    <input
                                    type='text'
                                    name='middleName'
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    required
                                    />
                                    <label>Middlename-name*</label>
                                </div>

                                <div className='input-box'>
                                    <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    />
                                    <label>Last-name*</label>
                                </div>
                            </div>

                            <div className='secondrow'>

                                <div className='input-box'>
                                    <input
                                    type='number'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required 
                                    />
                                    <label>Phone*</label>
                                </div>
                            </div>



                            <div className='input-box'>
                            <textarea
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                rows="4"
                                required
                                ></textarea>
                            <label>Address*</label>
                            </div>

                            <div className='select-input-box'>
                            <select
                                name='gender'
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
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
                        

                        

                    <div className=" regwrapper" >
                    <h3 className="centerMe ">CHANGE PASSWORD</h3>
                        
                        <form className="mobileWidth" onSubmit={handleSubmitPasswordForm}>

                            <div className='input-box'>
                                <input
                                type='password'
                                name='oldpassword'
                                value={formData.password}
                                onChange={handleChangePass}
                                required
                                />
                                <label>Old Password*</label>
                            </div>

                            <div className='input-box'>
                                <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChangePass}
                                required
                                />
                                <label>New Password*</label>
                            </div>

                            <div className='input-box'>
                                <input
                                type='password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChangePass}
                                required
                                />
                                <label>Confirm new password*</label>
                            </div>

                            <button type='submit' className='butn' disabled={isLoadingx} required>
                            {isLoadingx ? (
                                <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>
                            ) : (
                                'Submit'
                            )}
                            </button>
                        </form>
                    </div>


                    <div className=" regwrapper" >
                    <h3 className="centerMe ">LOGOUT FROM ALL DEVICES</h3>
                        
                        <form className="mobileWidth" onSubmit={handleLogOutAll }>

                            <button type='submit' className='butn' disabled={isLoadingy} required>
                            {isLoadingy ? (
                                <BeatLoader color='#ffffff' loading={isLoadingy} size={8} />
                            ) : (
                                'Logout'
                            )}
                            </button>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}