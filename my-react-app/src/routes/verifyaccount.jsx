import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { AppContext } from '../Context/App_Context';
import Swal from 'sweetalert2';

export function VerifyAccount() {
  const { API_base_url } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedMessage, setVerifiedMessage] = useState('Verification failed');

  let verifyToken = useRef('null');
  const navigate = useNavigate();

  const handleParams = () => {
    let params = (new URL(document.location)).searchParams;
    verifyToken.current = params.get('token');
  }
  
  useEffect(() => {
    handleParams();
  }, []);

  const handleSubmit = async (verifyToken) => {
    setIsLoading(true);

    try { 
      const response = await fetch(`${API_base_url}api/v1/users/verifyemail/${verifyToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if(data.status === 'success'){
        // let message = `Your account verification was successful. You have been successfully logged in.`
        // setVerifiedMessage(message);

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: `Your account verification was successful. You have been successfully logged in.`,
          timer: 2000,
          showConfirmButton: false
        })
        setTimeout(() => {
          navigate(`/`);
        }, 2000);
      }
      else{
        let message = `Your account verification attempt failed, possible invalid token`;
        setVerifiedMessage(message);
        Swal.fire(message);
      }

    } catch (error) {
      console.error('Error during login:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleSubmit(verifyToken.current);
  }, []); // Add verifyToken.current to the dependency array

  // Define fullwidth style object
  const fullwidth = {
    width: "100%",
  };

  // Define textWithShadow style object with corrected CSS properties
  const textWithShadow = {
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    color: "#007bff"
  };

  // Define flexme style object
  const flexme = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

  return (
    <div className='body' style={flexme}>
      <h2 style={textWithShadow}>VERIFYING ACCOUNT!</h2>
      <div style={fullwidth}>
        {isLoading ? (
          <BeatLoader color='#ffffff' loading={isLoading} size={20} />
        ) : (
          <div style={fullwidth }>
            <p style={textWithShadow}>{verifiedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
