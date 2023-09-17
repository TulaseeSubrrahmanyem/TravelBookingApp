import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BsCalendar2,BsPersonAdd} from 'react-icons/bs'
import {AiOutlineMinusCircle,AiOutlinePlusCircle} from "react-icons/ai"
import {MdOutlineArrowDropDown} from "react-icons/md";
import { LocationOn } from '@mui/icons-material';
import './index.css'; // Import the CSS file
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 // Import your custom CSS fileker.css';
import HotelListPage from "../HotelListPage/index.js"

function Hotel() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [checkIn, setCheckin] = useState(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(1); // Default number of adults
  const [children, setChildren] = useState(0); // Default number of children
  const [room, setRoom] = useState(1); // Default number of infants
  const [ismodalOpen, setIsModalOpen] = useState(false);
  
  const [hotels, setHotels] = useState([]);
  
  
  const searchHotels = async () => {
    try {
      console.log('Search hotels clicked');
      const response = await axios.get(`http://localhost:8080/api/hotels/search`, {
        params: {
          city: city,
        },
      });
      
  
      // const currentDate = new Date();
      // const minimumStayDuration = 1; // Minimum stay in days
      // const maximumStayDuration = 7; // Maximum stay in days
  
      // const updatedHotels = response.data.map((hotel) => {
      //   const availableCheckinDate = new Date(currentDate);
      //   availableCheckinDate.setDate(currentDate.getDate() + minimumStayDuration);
  
      //   const availableCheckoutDate = new Date(currentDate);
      //   availableCheckoutDate.setDate(currentDate.getDate() + maximumStayDuration);
  
      //   return {
      //     ...hotel,
      //     checkin_checkout_times: {
      //       checkin_from: availableCheckinDate.toISOString().slice(11, 16),
      //       checkout_to: availableCheckoutDate.toISOString().slice(11, 16),
      //     },
      //   };
      // });
  
      console.log("Response Data:", response.data);
  
      setHotels(response.data);
      navigate('/hotels', { state: { hotels:response.data } });
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      // Handle the error, show an error message, or do something else
    }
  };

  // useEffect(()=>{
  //   searchHotels()
  // },[])
  
   const openMadalBox=()=>{
    setIsModalOpen(!ismodalOpen)
   }
  const incrementTravelers = (type) => {
    if (type === 'adults') {
      setAdults(adults + 1);
    } else if (type === 'children') {
      setChildren(children + 1);
    } else if (type === 'room') {
      setRoom(room + 1);
    }
  };

  const decrementTravelers = (type) => {
    if (type === 'adults' && adults > 1) {
      setAdults(adults - 1);
    } else if (type === 'children' && children > 0) {
      setChildren(children - 1);
    } else if (type === 'room' && room > 1) {
      setRoom(room - 1);
    }
  };
  const totalPersons = adults + children ;
  const totalRooms=room;
 
 
  return (
  <div>
    <section className='homeSection1 mb-5'>
      <div className='card'>
       
         {/*Hotel  */}
         <div className='hotelBooking'>
          <div className='bookingBox'>
            <div className='d-flex flex-row'>
           {/*From place */}
             <div className='d-flex flex-row justify-content-between inputBox' style={{width:"350px",}}>
               <LocationOn className='icons'/>
               <div className='d-flex flex-column justify-content-start '> 
               
                    <input
                    type="text"
                    id="departure"
                    value={city}
                    placeholder='Search Location'
                    className='inputField'
                    onChange={event =>setCity(event.target.value)}
                    style={{width:"280px",marginTop:"15px"}}
                  />
               </div>
               
             </div>
              {/*check in date */}
              <div className='inputBox' style={{width:"150px"}}>
                
              <div className='d-flex flex-column m-0'>
                <div className='d-flex flex-row justify-content-around'>
                  <BsCalendar2   style={{width:"12px",height:"12px",marginTop:"9px"}}/>
                  <h1 className='inputData' style={{margin:"0px",marginTop:"7px"}}> Check in Date </h1>  
                </div>
                <DatePicker
                  selected={checkIn}
                  onChange={date => setCheckin(date)}
                  className="customDatePicker"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                /> 
              
              </div>        
              </div>
              {/*check out time */}
                <div className=' inputBox' style={{width:"150px"}}>
                
                <div className='d-flex flex-column m-0'>
                  <div className='d-flex flex-row justify-content-around '>
                    <BsCalendar2   style={{width:"12px",height:"12px",marginTop:"9px",}}/>
                    <h1 className='inputData' style={{margin:"0px",marginTop:"7px"}}> Check out Date </h1>  
                  </div>
                  <DatePicker
                    selected={checkOut}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    onChange={date => setCheckOut(date)}
                    className="customDatePicker"
                  
                 /> 
                
                </div>        
                </div>
                { /* End date */}
              
              {/*persons */}
              <div className="inputBox" style={{width:"300px"}}>
               <div className="d-flex flex-row justify-content-around"> 
                
                <div className="d-flex">
                  <BsPersonAdd className="icons" />
                  <h1 className="inputData mt-4">Travelers {totalPersons} Room {totalRooms}</h1>
                  <MdOutlineArrowDropDown className='openIcon' onClick={openMadalBox}/>
                </div> 
                </div> 
                { ismodalOpen &&( <div className='modal-content'  style={{width:"295px",top:"95px"}}>
                <ul className='unOrder'>
               <li>
                 <div className='d-flex flex-row justify-content-around'>
                   <div className="d-flex mt-1">
                     <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600"}}>Room </p> 
                   </div>
                   <div className='d-flex flex-row mt-2'>
                     <AiOutlineMinusCircle onClick={() => decrementTravelers('room')} style={{width:"20px",height:"20px",margin:"5px"}} />
                     <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{room}</p>
                     <AiOutlinePlusCircle onClick={() => incrementTravelers('room')} style={{width:"20px",height:"20px",margin:"5px", cursor: "pointer",}} />
                   </div>
                 </div>
               </li>
               <li>
                 <div className='d-flex flex-row justify-content-around'>
                   <div className="d-flex ">
                     <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600"}}> Adults<br/>2 - 11</p> 
                   </div>
                   <div className='d-flex flex-row mt-2'>
                     <AiOutlineMinusCircle onClick={() => decrementTravelers('adults')} style={{width:"20px",height:"20px",margin:"5px"}}/>
                     <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{adults}</p>
                     <AiOutlinePlusCircle onClick={() => incrementTravelers('adults')} style={{width:"20px",height:"20px",margin:"5px"}} />
                   </div>
                 </div>
               </li>
               <li>
                 <div className='d-flex flex-row justify-content-around'>
                   <div className="d-flex ">
                     <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600"}}>Children<br/>-2</p> 
                   </div>
                   <div className='d-flex flex-row mt-2'>
                     <AiOutlineMinusCircle onClick={() => decrementTravelers('children')}style={{width:"20px",height:"20px",margin:"5px"}}/>
                     <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{children}</p>
                     <AiOutlinePlusCircle onClick={() => incrementTravelers('children')} style={{width:"20px",height:"20px",margin:"5px"}} />
                   </div>
                 </div>
               </li>
             </ul>
             </div>)}
                </div>
              
             {/*button booking*/}
              <button className='bookingBtn' onClick={searchHotels}>
               Search
              </button>
              <ToastContainer position='center' />            
            </div>
            </div>
         </div>
      </div> 
    </section>

  </div>

  );
}

export default Hotel;
