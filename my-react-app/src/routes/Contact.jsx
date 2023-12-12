import { AppContext } from '../Context/App_Context';
import './contact.css'
import { useContext, useState } from 'react';
import { BeatLoader } from 'react-spinners';


export function Contact() {
  const { API_base_url } = useContext(AppContext)

  // const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    // Perform basic form validation
    const { name, email, message} = formData;
    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
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
      const response = await fetch(`${API_base_url}api/v1/contactmessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      data.data && alert('Message has been sent successful');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });

    } catch (error) {
      // Handle any errors
      console.error('Message not sent:', error);
    }
    setIsLoading(false);
  };
    
    return <>
    <div className="container">
        <h1 className='tex'>Contact us</h1>
        <h3 className='tex'>Have any questions? We'd love to hear from you</h3>
        <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>

        <div className="cards">
            <div className="card1">
           
            <form onSubmit={handleSubmit} className='form-container'>
            <h3>Feedback</h3>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <br />

              <label htmlFor="name">Phone:</label>
              <input
                type="text"
                id="phone"
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <br />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <br />

              <label htmlFor="message">Message:</label>
              <br />
              <textarea
                id="message" className='textarea'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows="4"
                cols="50"
                required
              ></textarea>
              <br />

              <button type="submit">Submit</button>
      </form>
            </div>

            <div className="card2">
                <h3>Contact Information</h3> 
                <div className="con-info">
                   <p><strong>Email:</strong> <a target='_blank' rel="noreferrer"  href={'mailto:mrsoft@mail.com'} >schoolman@mail.com</a> </p>
                   <p><strong>Phone:</strong> <a target='_blank' rel="noreferrer"  href={'tel:123-456-7890'} >123-456-7890</a></p>
                   <p><strong>FB:</strong> <a target='_blank' rel="noreferrer"  href={'FB address'} >fbaddress</a></p>
                   <p><strong>IG:</strong> <a target='_blank' rel="noreferrer"  href={'IG address'} >IG address</a></p>
                   <p><strong>Twitter:</strong> <a target='_blank' rel="noreferrer"  href={'Twitter address'} >Twitter address</a></p>
                   <p><strong>Web:</strong> <a target='_blank' rel="noreferrer" href='https://www.s-minternational.com'>SCHOOL INTERNATIONAL</a></p>


                   <p><strong>Address:</strong> 123 Street, Port-harcourt, Nigeria</p>
                </div>
          </div>
        </div>
    </div>
    
    </>
}