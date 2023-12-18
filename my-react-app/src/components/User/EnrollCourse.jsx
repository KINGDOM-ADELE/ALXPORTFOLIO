import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom"


// import './myinfo.css'
import '../General/myinfo.css'
import { useNavigate } from 'react-router-dom';


export function EnrollCourse() {
  const { API_base_url, getStoredToken,  setPageTitle } = useContext(AppContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(!getStoredToken()){
      navigate(`/`)
    }

    setPageTitle('ENROLL COURSE')
    return () => {
    };
  }, [ setPageTitle, navigate, getStoredToken ]);

  let targetCourseId = useRef('null')

  const refreshPage = () => {
    window.location.reload(false);
  }

  const HandleParams = () => {
    let params = (new URL(document.location)).searchParams;
    targetCourseId.current = params.get('targetCourseId');
  }
  HandleParams()
  
  const [isLoadingx, setIsLoadingx] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [myformData, setMyFormData] = useState({
    file: '',
    courseCode: '',
    courseName: '',
    description: '',
    CourseMode: '',
    Cost: 0,
    CardDetail: '',
    venue: '',
    stack: '', 
    Availability: ''
  });



  const handleChange = (event) => {
    setMyFormData({...myformData, [event.target.name]: event.target.value });
  };


  useEffect(() => {
    setPageTitle('PROFILE INFO');
    return () => {};
  }, [setPageTitle]);



  let CourseImage = <svg xmlns="http://www.w3.org/2000/svg" width="170px"  viewBox="0 0 16 16"><path fill="currentColor" d="M1 2.828c.885-.37 2.154-.769 3.388-.893c1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493c-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752c1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81c-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02c1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877c1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/></svg>
  if(myformData && myformData.filePath !== undefined){
    CourseImage = <img width="170px" src={API_base_url+myformData.filePath} alt="Profile pixels" />
  }

  const fetchData = async () => {
    let response
    setIsLoadingx(true)
    let url = `${API_base_url}api/v1/courses/${targetCourseId.current}`
    try {
      response = await fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
        // body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.status === 'success'){
        response = data.data
        

        setMyFormData({
          filePath: data.data.file.filePath,
          courseCode: data.data.courseCode,
          courseName: data.data.courseName,
          description: data.data.description,
          CourseMode: data.data.CourseMode,
          Cost: data.data.cost,
          venue: data.data.venue,
          stack: data.data.stack, 
          Availability: data.data.Availability
        });
        setIsLoadingx(false)
      }
      else{
        setIsLoadingx(false)
        throw Error('could not fetch the data for that resource, '+data.message)
      }
      
    } catch (error) {
      // Handle any errors
      Swal.fire(error)
      // console.error('Request failed:', error);
    }
    return response
  }

  let tarfetchData = useRef('null')
  tarfetchData.current = fetchData
  useEffect(() => {
    tarfetchData.current()
    return () => {};
  }, []);

  const validateForm = () => {
    // Perform basic form validation
    const { courseCode, courseName, description, CourseMode, venue, stack, Availability } = myformData;
    if ( !courseCode || !courseName || !description || !CourseMode || !venue || !stack || !Availability ) {
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


    const formData = new FormData();
    formData.append('courseCode', myformData.courseCode);
    formData.append('courseName', myformData.courseName);
    formData.append('description', myformData.description);
    formData.append('CourseMode', myformData.CourseMode);
    formData.append('venue', myformData.venue);
    formData.append('stack', myformData.stack);
    formData.append('Availability', myformData.Availability);
    console.log('formData') 
    console.log(formData)


    


    
    try {
        const response = await fetch(`${API_base_url}api/v1/users/enrollcourse/${targetCourseId.current}`, {
            method: 'PATCH',
            headers: {
              // 'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`
            },
            body: formData,
          });

          const data = await response.json();
          if(data.status === 'success'){
            // console.log('data.data')
            // console.log(data.data)
            Swal.fire('Course updated successfully');
            navigate(`/user/prefferdcourses`)
          }
          else{
            Swal.fire('Course update failed');
          }

    } catch (error) {
      // Handle any errors
      console.error('Update failed:', error);
    }
    setIsLoading(false);
  };
  
  
   
  return (<>

    <div className="just_a_container">
      <div className="main_flex_container ">
        <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
            <span  title='Back to prefferd courses'>
              <Link to="/user/prefferdcourses"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
            </span>

            <span onClick={refreshPage} title='Refresh'>
                <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="-1.5 -2.5 24 24"><path fill="currentColor" d="m17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194zM2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792a1 1 0 1 1 1.906.608a9.381 9.381 0 0 1-5.38 5.831a9.386 9.386 0 0 1-11.265-3.328z"/></svg>
            </span>
        </div>
      </div>
    </div>
    {isLoadingx ? (
        <h3 className=" centerMe" >{isLoadingx && <BeatLoader color='green' loading={isLoadingx} size={8} /> }</h3>
    ) : (
        <div className="main_flex_container ">
          <div className="flexedContainer myspans " id='Overideflexdirection1Tocol' >
              
            <div className=" regwrapper" >
            <h3 className="centerMe ">ENROLL COURSE</h3>
            <div className="flex_container9">
            <div className="son9 son19">
            { CourseImage }  

            </div>
            <div className="son9 son29">
            <p><strong>CODE:</strong> {myformData.courseCode} </p>
            <p><strong>NAME:</strong> {myformData.courseName} </p>
            <p><strong>MODE:</strong> {myformData.CourseMode} </p>
            <p><strong>VENUE:</strong> {myformData.venue} </p>
            <p><strong>COST:</strong> {myformData.Cost} </p>
            <p><strong>ACAILABILITY:</strong> {myformData.Availability} </p>

            </div>
          </div>
          <p><strong>DESCRIPTION:</strong> {myformData.description} </p>
          
                
                <form id="mobileWidth" onSubmit={handleSubmit}>
                    <div className='firstrow'>


                      
                        <div className='input-box'>
                            <input
                            type='text'
                            name='cost'
                            value={myformData.CardDetail}
                            onChange={handleChange}
                            required
                            />

                            <label>Card Detail (Simulating card payment) *</label>
                        </div>

                    </div>





                    <button type='submit' className='butn' disabled={isLoading} required>
                    {isLoading ? (
                        <BeatLoader color='#ffffff' loading={isLoading} size={8} />
                    ) : (
                        'Pay'
                    )}
                    </button>
                </form>
            </div>
          </div>
        </div>
    )}

  </>)
}
