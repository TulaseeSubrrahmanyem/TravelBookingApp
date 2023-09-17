import React, { useState, useEffect,useRef ,createC} from 'react';
import { useNavigate,Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import {BsCalendar2,BsPersonAdd} from 'react-icons/bs'
import {AiOutlineMinusCircle,AiOutlinePlusCircle} from "react-icons/ai"
import {MdOutlineArrowDropDown} from "react-icons/md";
import { LocationOn } from '@mui/icons-material';
import '../components/hoteSearchBox.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 // Import your custom CSS fileker.css';
import HotelListPage from "../HotelListPage/index.js"
import citySuggestions from '../cities.json';
import RoomBooking  from '../RoomBooking';



function HotelSearchBox() {

  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(1); // Default number of adults
  const [children, setChildren] = useState(0); // Default number of children
  const [room, setRoom] = useState(1); // Default number of infants
  const [ismodalOpen, setIsModalOpen] = useState(false);
  
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);

  const predefinedSuggestions =[
    'Agartala',       'Agra',           'Ahmedabad',
    'Amritsar',       'Anjuna',         'Arpora',
    'Attibele',       'Aurangabad',     'Baga',
    'Bangalore',      'Belagula',       'Benaulim',
    'Betul',          'Bhubaneshwar',   'Bogmalo',
    'Calangute',      'Canacona',       'Candolim',
    'Cansaulim',      'Cavelossim',     'Chandīgarh',
    'Chennai',        'Chikmagalūr',    'Chittūr',
    'Cochin',         'Colva',          'Coonoor',
    'Darjeeling',     'Fatehpur Sīkri', 'Gandhinagar',
    'Gangtok',        'Gurgaon',        'Guwahati',
    'Gwalior',        'Hampi',          'Hyderabad',
    'Indore',         'Jaipur',         'Jaisalmer',
    'Jamshedpur',     'Jodhpur',        'Kazhakuttam',
    'Khajurāho',      'Kolkata',        'Kollam',
    'Kovalam',        'Kozhikode',      'Kumarakom',
    'Kumbakonam',     'Kurseong',       'Kāladi',
    'Kūfrī',          'Lonavala',       'Lucknow',
    'Ludhiana',       'Madurai',        'Mahabaleshwar',
    'Mahabalipuram',  'Majorda',        'Mangalore',
    'Manipala',       'Mararikulam',    'Mumbai',
    'Munnar',         'Mussoorie',      'Mysore',
    'Nagpur',         'Nainital',       'Nashik',
    'Navi Mumbai',    'New Delhi',      'Noida',
    'Old Goa',        'Ooty',           'Panaji',
    'Panposh',        'Pantnagar',      'Pondicherry',
    'Pune',           'Puri',           'Pushkar',
    'Sawāi Mādhopur', 'Shimla',         'Surat',
    'Thane',          'Thekkady',       'Tiruchchirāppalli',
    'Trivandrum',     'Udaipur',        'Utorda',
    'Vadodara',       'Vagator',        'Vapi',
    'Varanasi',       'Varca',          'Varkala',
    'Vijayawāda',     'Visakhapatnam',  'Yercaud'
  ]
 // Functions to update check-in and check-out dates
 const updateCheckIn = (date) => {
  setCheckIn(date);
  console.log("updateCheckin",checkIn)
  // navigate('/room/booking',{state:{checkInDate:checkIn}})
};

const updateCheckOut = (date) => {
  setCheckOut(date);
  // navigate('/room/booking',{state:{checkOutDate:checkOut}})
 
};


  const searchHotels = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when starting the request.
  
      if (!city) {
        const errorMessage = 'Please enter a city.';
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false); // Set isLoading to false since an error occurred.
        return;
      }
  
      console.log('Search hotels clicked');
      const response = await axios.get(`http://localhost:8080/api/hotels/search`, {
        params: {
          city: city,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          adults: adults,
          children: children,
          rooms: room,
        },
      });
      console.log('Response Data:', response.data);
      if (response.data.length === 0) {
        const errorMessage = 'No hotels available for the specified city.';
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false); // Set isLoading to false since there's no data.
        return;
      } else {
        console.log("Response Data:", response.data);
        setHotels(response.data);
      }
    // Before navigating, log the checkIn and checkOut values
   // console.log('checkIn:', checkIn.toISOString());
   // console.log('checkOut:', checkOut.toISOString());

      // The navigation should be done here after successful data fetching.
      navigate('/hotel/hotelsList/',{ state: { hotels: response.data, city: city,CheckInDate:checkIn, CheckOutDate:checkOut,Adults:adults,Childs:children,errorMessage:'', isLoading:false } },1000);
      
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      setIsLoading(false); // Set isLoading to false since an error occurred.
      const errorMessage = 'An error occurred while searching for hotels.';
      setErrorMessage(errorMessage);
      navigate('/hotel/hotelsList/', { state: { errorMessage, hotels: [], city, isLoading:false } });
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
 
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    const filteredSuggestions = value
      ? citySuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      : predefinedSuggestions;

    setSuggestions(filteredSuggestions);
    setSelectedSuggestionIndex(-1);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent the default arrow key behavior
      if (e.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
        scrollSuggestionIntoView(selectedSuggestionIndex + 1); 
      } else if (e.key === 'ArrowUp' && selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
        scrollSuggestionIntoView(selectedSuggestionIndex - 1); 
      }
    } else if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (suggestions.length > 0) {
        // If there are suggestions, select the currently highlighted suggestion
        const selectedSuggestion = suggestions[selectedSuggestionIndex];
        if (selectedSuggestion) {
          setCity(selectedSuggestion);
          setSuggestions([]); // Clear suggestions
        }
      }
    }
  };
  const scrollSuggestionIntoView = (index) => {
    // Find the suggestion list container element with class 'suggestionBox'
    const suggestionList = document.querySelector('.suggestionBox');
    if (suggestionList) {
      // Find the specific suggestion (li element) corresponding to the selected index
      const suggestionElement = suggestionList.querySelector(`li:nth-child(${index + 1})`);
      if (suggestionElement) {
        // Scroll the suggestion list to bring the selected suggestion into view
        suggestionList.scrollTop = suggestionElement.offsetTop;
      }
    }
  };
  const handleSuggestionClick = (suggestion) => {
    
    setCity(suggestion);
    setSuggestions([]);
   
  };

 
  return (
  <div>
   
      <div className='hotelInputCard'>
       
         {/*Hotel  */}
        <div className='hotelBookingBox'>
         <div className='d-flex flex-row justify-content-center'>
           {/*From place */}
          <div className='d-flex flex-column'>
            <div className='d-flex flex-row justify-content-between inputBox' style={{width:"350px",}}>
             <LocationOn className='icons'/>
               <div className='d-flex flex-column justify-content-start '> 
               
                    <input
                    type="text"
                    id="departure"
                    value={city}
                    placeholder='Search Location'
                    className='inputField'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{width:"280px",marginTop:"15px"}}
                    autoComplete="off" // Add this line to disable auto-suggestions
                    
                    />
               </div>
             </div>
             {city && suggestions.length > 0 && (
              <div className='suggestionBox'>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li 
                     key={index}
                     onKeyDown={handleKeyDown}
                     onClick={() => handleSuggestionClick(suggestion)}
                    //  onMouseEnter={() => setSelectedSuggestionIndex(index)} // Update selected suggestion on mouse hover
                     className={index === selectedSuggestionIndex ? 'selected-suggestion' : ''}
                     >
                     <div className='d-flex flex-row justify-content-start'>
                        <LocationOn className='icons' />
                        <p style={{marginTop:'15px'}}>{suggestion}  </p>
                       </div>
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            )}
           </div>
             
              {/*check in date */}
              <div className='inputBoxDate'>
                
              <div className='d-flex flex-column m-0'>
                <div className='d-flex flex-row justify-content-around'>
                  <BsCalendar2   style={{width:"12px",height:"12px",marginTop:"9px"}}/>
                  <h1 className='inputData' style={{margin:"0px",marginTop:"7px"}}> Check in Date </h1>  
                </div>
                <DatePicker
                selected={checkIn}
                onChange={(date) => {
                  updateCheckIn(date); // Update check-in date using the context function
                }}
                className="customDatePicker"
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                /> 
              
              </div>        
              </div>
              {/*check out time */}
                <div className=' inputBoxDate'>
                
                <div className='d-flex flex-column m-0'>
                  <div className='d-flex flex-row justify-content-around '>
                    <BsCalendar2   style={{width:"12px",height:"12px",marginTop:"9px",}}/>
                    <h1 className='inputData' style={{margin:"0px",marginTop:"7px"}}> Check out Date </h1>  
                  </div>
                  <DatePicker
                  selected={checkOut}
                  onChange={(date) => {
                    updateCheckOut(date); // Update check-out date using the context function
                  }}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
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
              {/*<Link to={`/room/booking?checkin=${checkIn.toISOString()}&checkout=${checkOut.toISOString()}`}>
              <button className='bookingBtn' onClick={searchHotels}>
                Search
              </button>
                  </Link>*/}
                  
            </div>
            </div>
                
      </div> 
      <ToastContainer
        position='top-center' // Centered at the top of the screen
        autoClose={3000}  
    />
    
  </div>

  );
}

export default HotelSearchBox ;
