import { useContext } from 'react';
import { AppContext } from '../Context/App_Context';
import './footer.css';
import { Link } from 'react-router-dom';

export function Footer() {
  const { APP_NAME } = useContext(AppContext)
  let DATE = new Date()
  let YY = DATE.getFullYear()
  return (
    <div className='footer'>
        <div className='text'>
      DESIGNED AND DEVELOPED BY <a className='cursorPointer' target='_blank' rel="noreferrer"  href='https://www.linkedin.com/in/kingdom-adele-3aa04087'>KINGDOM ADELE</a>, ASSISTED BY <a className='cursorPointer' target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/gift-ndimande-b5b970245/'>GIFT NDIMANDE</a> AND 
       <a className='cursorPointer' target='_blank' rel="noreferrer" href='https://www.example.com'> KINI BIE' HONORE'</a>
      </div>
      <div className='text'>
      <Link className='cursorPointer' to='Contact' id='contactlink'>CONTACT US</Link>

      </div>
      <div className='text'>
      &copy;&nbsp;{APP_NAME}&nbsp;{YY}
      </div>
    </div>
  );
}
