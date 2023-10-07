  import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { BsCalendar2, BsPersonAdd } from 'react-icons/bs';
  import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
  import { MdOutlineArrowDropDown } from "react-icons/md";
  import { LocationOn } from '@mui/icons-material';
  import '../components/hoteSearchBox.css';
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import HotelListPage from "../HotelListPage/index.js";
  import citySuggestions from '../cities.json';
 

  function HotelSearchBox() {
    const navigate = useNavigate();
  
    const [city, setCity] = useState('');
    const [checkIn, setCheckIn] = useState(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [checkOut, setCheckOut] = useState(tomorrow);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [room, setRoom] = useState(1);
    const [ismodalOpen, setIsModalOpen] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
    // const inputRef = useRef(null);
    const [searching, setSearching] = useState(false);

    const predefinedSuggestions = useMemo(() =>
    [
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
    ], []);
  
    const updateCheckIn = useCallback((date) => {
      setCheckIn(date);
    }, []);
  
    const updateCheckOut = useCallback((date) => {
      setCheckOut(date);
    }, []);
  
    const searchHotels = useCallback(async () => {
      console.log("Search button clicked")
      setIsLoading(true); // Show loading indicator
      try {
         
        if (!city) {
          const errorMessage = 'Please enter a city.';
          setErrorMessage(errorMessage);
          toast.error(errorMessage);
          setIsLoading(false);
          return;
        }
  
        const response = await axios.get(`https://travelapp-l6go.onrender.com/api/hotels/search`, {
          params: {
            city: city,
            checkIn: checkIn.toISOString(),
            checkOut: checkOut.toISOString(),
            adults: adults,
            children: children,
            rooms: room,
          },
        });
  
        if (response.data.length === 0) {
          const errorMessage = 'No hotels available for the specified city.';
          setErrorMessage(errorMessage);
          toast.error(errorMessage);
          setIsLoading(false);
          return;
        } else {
          setHotels(response.data);
        
  
        setTimeout(() => {
          navigate('/hotel/hotelsList/', {
            state: {
              hotels: response.data,
              city: city,
              CheckInDate: checkIn,
              CheckOutDate: checkOut,
              Adults: adults,
              Childs: children,
              errorMessage: '',
              isLoading: false,
            },
          });
        }, 1000);
      }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setIsLoading(false);
        const errorMessage = 'An error occurred while searching for hotels.';
        setErrorMessage(errorMessage);
        navigate('/hotel/hotelsList/', { state: { errorMessage, hotels: [], city, isLoading: false } });
      }
    }, [city, checkIn, checkOut, adults, children, room, navigate]);
  
    const openModalBox = useCallback(() => {
      setIsModalOpen(!ismodalOpen);
    }, [ismodalOpen]);
  
    const incrementTravelers = useCallback((type) => {
      if (type === 'adults') {
        setAdults(adults + 1);
      } else if (type === 'children') {
        setChildren(children + 1);
      } else if (type === 'room') {
        setRoom(room + 1);
      }
    }, [adults, children, room]);
    
    const decrementTravelers = useCallback((type) => {
      if (type === 'adults' && adults > 1) {
        setAdults(adults - 1);
      } else if (type === 'children' && children > 0) {
        setChildren(children - 1);
      } else if (type === 'room' && room > 1) {
        setRoom(room - 1);
      }
    }, [adults, children, room]);
    
    const totalPersons = useMemo(() => adults + children, [adults, children]);
    const totalRooms = room;
  
    const handleInputChange = useCallback((e) => {
      const value = e.target.value;
      setCity(value);
  
      const filteredSuggestions = value
        ? citySuggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          )
        : predefinedSuggestions;
  
      setSuggestions(filteredSuggestions);
      setSelectedSuggestionIndex(-1);
    }, [city, predefinedSuggestions]);
  
    const handleKeyDown = useCallback((e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (e.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
          setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
          scrollSuggestionIntoView(selectedSuggestionIndex + 1);
        } else if (e.key === 'ArrowUp' && selectedSuggestionIndex > 0) {
          setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
          scrollSuggestionIntoView(selectedSuggestionIndex - 1);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestions.length > 0) {
          const selectedSuggestion = suggestions[selectedSuggestionIndex];
          if (selectedSuggestion) {
            setCity(selectedSuggestion);
            setSuggestions([]);
          }
        }
      }
    }, [selectedSuggestionIndex, suggestions]);
  
    const scrollSuggestionIntoView = useCallback((index) => {
      const suggestionList = document.querySelector('.suggestionBox');
      if (suggestionList) {
        const suggestionElement = suggestionList.querySelector(`li:nth-child(${index + 1})`);
        if (suggestionElement) {
          suggestionList.scrollTop = suggestionElement.offsetTop;
        }
      }
    }, []);
  
    const handleSuggestionClick = useCallback((suggestion) => {
      setCity(suggestion);
      setSuggestions([]);
    }, []);
  
    return (
       <div className='container'>
       <div className='row '>
        <div className='hotelInputCard'>
          <div className='hotelBookingBox'>
            <div className='d-sm-flex flex-sm-column  justify-content-sm-center align-item-sm-center d-md-flex flex-md-row'>
             {/*search hotel */}  
            <div className='d-flex flex-column '>
                <div className='d-flex flex-row justify-content-between  inputSearchBox'>
                  <LocationOn className='icons' />
                  <div className='d-flex flex-column justify-content-start '>
                    <input
                      type="text"
                      id="departure"
                      value={city}
                      placeholder='Search Location'
                      className='searchInput'
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                     
                      autoComplete="off"
                    />
                  </div>
                </div>
                {city && suggestions.length > 0 && (
                  <div className='suggestionBox '>
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onKeyDown={handleKeyDown}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={index === selectedSuggestionIndex ? 'selected-suggestion' : ''}
                        >
                          <div className='d-flex flex-row justify-content-start'>
                            <LocationOn className='icons' />
                            <p style={{ marginTop: '15px' }}>{suggestion}  </p>
                          </div>
                          <hr />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/*dates booking */}
           
                <div className='inputBoxDate '>
                  <div className='d-flex flex-column justify-content-evenly'>
                    <div className='d-flex flex-row justify-content-start '>
                      <BsCalendar2 style={{ width: '15px', height: '15px', marginTop: '5px', marginLeft: '10px', marginRight: '10px' }}/>
                      <h1 className='inputData' style={{marginTop:"3px",marginBottom:"0px"}}> Check in Date </h1>
                    </div>
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => {
                        updateCheckIn(date);
                      }}
                      className="customDatePicker"
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <div className=' inputBoxDate'>
                  <div className='d-flex flex-column justify-content-evenly m-0'>
                    <div className='d-flex flex-row justify-content-start '>
                      <BsCalendar2 style={{ width: '15px', height: '15px', marginTop: '5px', marginLeft: '10px', marginRight: '10px' }} />
                      <h1 className='inputData' style={{marginTop:"3px",marginBottom:"0px"}}> Check out Date </h1>
                    </div>
                    <DatePicker
                      selected={checkOut}
                      onChange={(date) => {
                        updateCheckOut(date);
                      }}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="customDatePicker"
                    />
                  </div>
                </div>
         
              
              <div className="inputBox col-12" >
                <div className="d-flex flex-row justify-content-around">
                  <div className="d-flex ">
                    <BsPersonAdd className="icons" />
                    <h1 className="inputData" style={{marginTop:"20px"}}>Travelers {totalPersons} Room {totalRooms}</h1>
                    <MdOutlineArrowDropDown className='openIcon' onClick={openModalBox} />
                  </div>
                </div>
                {ismodalOpen && (
                  <div className='modal-content col-sm-12' >
                    <ul className='unOrder'>
                      <li>
                        <div className='d-flex flex-row justify-content-around'>
                          <div className="d-flex mt-1">
                            <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600" }}>Room </p>
                          </div>
                          <div className='d-flex flex-row mt-2'>
                            <AiOutlineMinusCircle onClick={() => decrementTravelers('room')} style={{ width: "20px", height: "20px", margin: "5px" }} />
                            <p style={{ marginTop: "3px", marginLeft: "5px", marginRight: "5px" }}>{room}</p>
                            <AiOutlinePlusCircle onClick={() => incrementTravelers('room')} style={{ width: "20px", height: "20px", margin: "5px", cursor: "pointer" }} />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex flex-row justify-content-around'>
                          <div className="d-flex ">
                            <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600" }}> Adults<br />+12</p>
                          </div>
                          <div className='d-flex flex-row mt-2'>
                            <AiOutlineMinusCircle onClick={() => decrementTravelers('adults')} style={{ width: "20px", height: "20px", margin: "5px" }} />
                            <p style={{ marginTop: "3px", marginLeft: "5px", marginRight: "5px" }}>{adults}</p>
                            <AiOutlinePlusCircle onClick={() => incrementTravelers('adults')} style={{ width: "20px", height: "20px", margin: "5px" }} />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex flex-row justify-content-around'>
                          <div className="d-flex ">
                            <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600" }}>Children<br />2 - 11</p>
                          </div>
                          <div className='d-flex flex-row mt-2'>
                            <AiOutlineMinusCircle onClick={() => decrementTravelers('children')} style={{ width: "20px", height: "20px", margin: "5px" }} />
                            <p style={{ marginTop: "3px", marginLeft: "5px", marginRight: "5px" }}>{children}</p>
                            <AiOutlinePlusCircle onClick={() => incrementTravelers('children')} style={{ width: "20px", height: "20px", margin: "5px" }} />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button className='bookingBtn col-sm-12' onClick={searchHotels}>  {isLoading ? 'Searching...' : 'Search'}</button>
            </div>
          </div>
        </div>        
        <ToastContainer position='top-center' autoClose={3000} />
      </div>
      </div>
    );
  }
  
  export default HotelSearchBox;
  