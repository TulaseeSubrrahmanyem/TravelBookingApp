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
import HotelSearchBox from '../components/hotelSearchBox.js';
import HotelFeatures from '../components/hotelFeatures';
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
      
  
  
      console.log("Response Data:", response.data);
      setHotels(response.data);
      navigate('/hotels', { state: { hotels:response.data ,city:response.data.city } });
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      // Handle the error, show an error message, or do something else
    }
  };

 
  
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
 
    <section >
     <div className='hotelSection' >
      <div className="hotelSearchBox">
          <HotelSearchBox /> 
      </div>
     </div>
    
     <div style={{marginTop:"100px"}}>
     <HotelFeatures/>
     </div>
     
    </section>



  );
}

export default Hotel;
