import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom"


// import './myinfo.css'
import '../General/myinfo.css'
import { useNavigate } from 'react-router-dom';
export function EditCourse() {
  const { API_base_url, getStoredToken,  setPageTitle } = useContext(AppContext)
  const navigate = useNavigate();

  
  useEffect(() => {
    if(!getStoredToken()){
      navigate(`/`)
    }

    setPageTitle('EDIT COURSE')
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
    venue: '',
    stack: '', 
    Availability: ''
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


  useEffect(() => {
    setPageTitle('PROFILE INFO');
    return () => {};
  }, [setPageTitle]);


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
        console.log('data.data')
        console.log(data.data)
        setMyFormData({
          courseCode: data.data.courseCode,
          courseName: data.data.courseName,
          description: data.data.description,
          CourseMode: data.data.CourseMode,
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
      console.error('Request failed:', error);
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
    if (selectedImage !== null){ formData.append('file', selectedImage ); }
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
        const response = await fetch(`${API_base_url}api/v1/courses/${targetCourseId.current}`, {
            method: 'PATCH',
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
            Swal.fire('Course updated successfully');
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
            <span  title='Back to courses'>
              <Link to="/admin/allcourses"><svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon' viewBox="0 0 24 24"><path fill="currentColor" d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"/></svg></Link>
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
            <h3 className="centerMe ">ADMIN EDIT COURSE</h3>
                
                <form id="mobileWidth" onSubmit={handleSubmit}>
                    <div className='firstrow'>

                      <label>Course Image</label>
                      <div className='input-box'>
                            <input
                            type="file"
                            name="file"
                            onChange={handleImageUpload}
                        
                            />
                        </div>


                        <div className='input-box'>
                            <input
                            type='text'
                            name='courseCode'
                            value={myformData.courseCode}
                            onChange={handleChange}
                            required
                            />
                            <label>Course Code*</label>
                        </div>

                        <div className='input-box'>
                            <input
                            type='text'
                            name='courseName'
                            value={myformData.courseName}
                            onChange={handleChange}
                            required
                            />
                            <label>Course Name*</label>
                        </div>

                    </div>


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

                    <div className='select-input-box2'>
                    <select
                        name='CourseMode'
                        value={myformData.CourseMode}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select CourseMode</option>
                        <option value='Online Full-time'>Online Full-time</option>
                        <option value='Online Part-time'>Online Part-time</option>
                        <option value='On-Site Full-time'>On-Site Full-time</option>
                        <option value='On-Site Part-time'>On-Site Part-time</option>
                    </select>
                    </div>

                    <div className='select-input-box2'>
                    <select
                        name='venue'
                        value={myformData.venue}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select venue</option>
                        <option value='Online'>Online</option>
                        <option value='MRsoft Technology Complex, Port Harcourt.'>MRsoft Technology Complex, Port Harcourt.</option>
                    </select>
                    </div>

                    
                    <div className='select-input-box2'>
                    <select
                        name='stack'
                        value={myformData.stack}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select stack</option>
                        <option value='NONE'>NONE</option>
                        <option value='WEB TRINITY AND REACT'>WEB TRINITY AND REACT</option>
                        <option value='WEB TRINITY AND ANGULAR'>WEB TRINITY AND ANGULAR</option>
                        <option value='WEB TRINITY AND VUE'>WEB TRINITY AND VUE</option>
                        <option value='MEAN'>MEAN</option>
                        <option value='MERN'>MERN</option>
                        <option value='MERM'>MERM</option>
                        <option value='LAMP'>LAMP</option>
                        <option value='LEMP'>LEMP</option>
                        <option value='BACK END WITH NODE'>BACK END WITH NODE</option>
                        <option value='BACK END WITH PHP'>BACK END WITH PHP</option>
                        <option value='BACK END WITH PYTHON'>BACK END WITH PYTHON</option>
                        <option value='OTHERS'>OTHERS</option>

                    </select>
                    </div>

                    <div className='select-input-box2'>
                    <select
                        name='Availability'
                        value={myformData.Availability}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select availability</option>
                        <option value='available now'>Available now</option>
                        <option value='pending'>Pending</option>
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
          </div>
        </div>
    )}

  </>)
}
