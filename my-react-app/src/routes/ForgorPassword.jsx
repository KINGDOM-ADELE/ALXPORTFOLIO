import './login.css';
import { Link, useNavigate } from 'react-router-dom';
// import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AppContext } from '../Context/App_Context';


export function ForgotPassword() {

  const { API_base_url, handleAlreadyLoggedIn } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  ///
  useEffect(() => {
    let path = handleAlreadyLoggedIn()
    path && navigate(`/${path}`)
    return () => {
    };
  }, [ API_base_url, handleAlreadyLoggedIn, navigate]);
  ///

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_base_url}api/v1/users/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(data.status === 'success'){
        alert(`A passward reset link has been sent to ${formData.email}`)
        navigate(`/`)
      }
      else{
        alert(`Sending passward reset link to ${formData.email}, failed`)
      }

    } catch (error) {
      console.error('Error during login:', error);
      setError('Incorrect credentials...');
    }

    setIsLoading(false);
  };

  return (
    <div className='body'>
      <div className='wrapper'>
        <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
        <div className='form'>
          <h2>Forgot password</h2>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            {error && <div className='error-message'>{error}</div>}

            <button type='submit' className='butn' disabled={isLoading} required>
              {isLoading ? (
                <BeatLoader color='#ffffff' loading={isLoading} size={8} />
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
