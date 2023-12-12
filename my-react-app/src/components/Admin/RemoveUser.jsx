import { useContext, useEffect } from 'react';
// import './myinfo.css'
import '../General/myinfo.css'
import { AppContext } from '../../Context/App_Context';
// import Swal from 'sweetalert2';


export function RemoveUser() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('REMOVE USER')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>REMOVE USER</h2>
        </div>
      
      
      </>
}