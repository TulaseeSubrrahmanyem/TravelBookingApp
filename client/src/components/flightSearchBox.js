import React, { useState } from 'react';
import { MdOutlineMore } from 'react-icons/md';
import { RiFlightTakeoffLine, RiFlightLandLine } from 'react-icons/ri';
import { BsCalendar2, BsPersonAdd } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineArrowDropDown } from 'react-icons/md';

import { LocationOn } from '@mui/icons-material';
import '../components/flightSearchBox.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FlightSearchBox = () => {
  const [selectedOption, setSelectedOption] = useState('oneway');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);

  const [departDate, setDepartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);
  const [adults, setAdults] = useState(1); 
  const [children, setChildren] = useState(0); // Default number of children
  const [infants, setInfant] = useState(0); // Default number of infants
  const [option, setOption] = useState('economy');
  const [ismodalOpen, setIsModalOpen] = useState(false);

  const openModalBox = () => {
    setIsModalOpen(!ismodalOpen);
  };

  const incrementTravelers = (type) => {
    if (type === 'adults') {
      setAdults(adults + 1);
    } else if (type === 'children') {
      setChildren(children + 1);
    } else if (type === 'infants') {
      setInfant(infants + 1);
      console.log("infants",infants)
    }
  };

  const decrementTravelers = (type) => {
    if (type === 'adults' && adults > 1) {
      setAdults(adults - 1);
    } else if (type === 'children' && children > 0) {
      setChildren(children - 1);
    } else if (type === 'infants' && infants > 0) {
      setInfant(infants - 1);
      console.log("infants",infants)
    }
  };

  const totalPersons = adults + children + infants;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptions = (event) => {
    setOption(event.target.value);
  };

  const bookTicket = () => {
    // Input validation
    if (
      !selectedOption ||
      !departure ||
      !arrival ||
      !departDate ||
      adults <= 0 ||
      children < 0 ||
      infants < 0 ||
      !option
    ) {
      // Display an error toast
      toast.error('Please provide valid input for all fields', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return; // Stop further execution
    }

    console.log('booking');
    console.log('Booking Details:');
    console.log('Selected Option:', selectedOption);
    console.log('Departure:', departure);
    console.log('Arrival:', arrival);
    console.log('Departure Date:', departDate);
    console.log('Number of Adults:', adults);
    console.log('Number of Children:', children);
    console.log('Number of Infants:', infants);
    console.log('Travel Class:', option);
    toast.success('Confirmed Your Booking', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // 3000 milliseconds = 3 seconds
    });
  };

  return (
    <div className="flightBooking">
      {/* Input user */}
      <div className="d-sm-flex d-sm-column justify-content-sm-between d-md-flex flex-md-row justify-content-md-between mt-2">
        <div className="d-flex flex-row  ">
          <div className="d-flex flex-row">
            <input
              type="radio"
              id="oneway"
              name="tripType"
              value="oneway"
              checked={selectedOption === 'oneway'}
              onChange={handleOptionChange}
              className="radioInput"
            />
            <label htmlFor="oneway" style={{fontWeight:"600"}} >
              One Way
            </label>
          </div>
          <div className="d-flex flex-row">
            <input
              type="radio"
              id="twoway"
              name="tripType"
              value="twoway"
              checked={selectedOption === 'twoway'}
              onChange={handleOptionChange}
              className="radioInput"
              required
            />
            <label htmlFor="twoway" style={{fontWeight:"600"}}>
              Round Trip
            </label>
          </div>
        </div>
        <div className='flightOption'>
          <select value={option} onChange={handleOptions}>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="firstClass">First Class</option>
          </select>
        </div>
      </div>

      {/* Flight options */}
      {selectedOption === 'oneway' && (
        <div className="d-sm-flex flex-sm-column d-md-flex flex-md-row">
          {/* From place */}
          <div className="d-flex flex-row justify-content-start inputBox">
            <RiFlightTakeoffLine className="icons" />
            <div className="d-flex flex-column justify-content-evenly ">
              <h1 className="inputDataFlight ">Flying From</h1>
              <input
                type="text"
                id="departure"
                value={departure}
                placeholder="Enter From Location"
                className="inputField"
                onChange={(event) => setDeparture(event.target.value)}
              />
            </div>
          </div>
          {/* Destination */}
          <div className="d-flex flex-row justify-content-start inputBox">
            <RiFlightLandLine className="icons" />
            <div className="d-flex flex-column justify-content-evenly">
              <h1 className="inputDataFlight">Destination To</h1>
              <input
                type="text"
                id="arrival"
                value={arrival}
                placeholder="Enter From Location"
                className="inputField"
                onChange={(event) => setArrival(event.target.value)}
                required
              />
            </div>
          </div>
          {/* Depart time */}
          <div className="inputBox">
            <div className="d-flex flex-column justify-content-evenly">
              <div className="d-flex flex-row ">
                <BsCalendar2 style={{ width: '15px', height: '15px', marginTop: '9px', marginLeft: '10px', marginRight: '10px' }} />
                <h1 className="inputDataFlight" style={{marginTop:"3px",marginBottom:"0px"}} >Depart Date</h1>
              </div>
              <DatePicker
                selected={departDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setDepartDate(date)}
                className="customDatePickerFlight"
                placeholderText="23/06/2023" // Display the formatted default date as a placeholder
              />
            </div>
          </div>
          {/* End date */}
          {/* Persons */}
          <div className="d-flex flex-column  inputBox">
             <div className="d-flex flex-row justify-content-center">
              <BsPersonAdd className="icons" />
              <div className='d-flex flex-row justify-content-start'>
                <h1 className="inputDataFlight" style={{marginTop:"15px"}}>Travelers {totalPersons}</h1>
                <MdOutlineArrowDropDown className="openIcon" onClick={openModalBox} />
              </div>
              </div>
              {ismodalOpen && (
                <div className="modal-content-flight" >
                  <div className="">
                    <ul className="unOrder">
                      <li>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="mt-3">
                            <p style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '600', paddingLeft: '20px' }}>
                              Adults <br />+12
                            </p>
                          </div>
                          <div className="d-flex flex-row mt-3">
                            <AiOutlineMinusCircle onClick={() => decrementTravelers('adults')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                            <p style={{ marginTop: '3px', marginLeft: '5px', marginRight: '5px' }}>{adults}</p>
                            <AiOutlinePlusCircle onClick={() => incrementTravelers('adults')} style={{ width: '20px', height: '20px', margin: '5px', cursor: 'pointer' }} />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="mt-3">
                            <p style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '600', paddingLeft: '20px' }}>
                              Children<br />2 - 11
                            </p>
                          </div>
                          <div className="d-flex flex-row mt-3">
                            <AiOutlineMinusCircle onClick={() => decrementTravelers('children')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                            <p style={{ marginTop: '3px', marginLeft: '5px', marginRight: '5px' }}>{children}</p>
                            <AiOutlinePlusCircle onClick={() => incrementTravelers('children')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="mt-3">
                            <p style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '600', paddingLeft: '20px' }}>
                              Infants<br />-2
                            </p>
                          </div>
                          <div className="d-flex flex-row mt-3">
                            <AiOutlineMinusCircle onClick={() => decrementTravelers('infants')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                            <p style={{ marginTop: '3px', marginLeft: '5px', marginRight: '5px' }}>{infants}</p>
                            <AiOutlinePlusCircle onClick={() => incrementTravelers('infants')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
           
          </div>
          {/* Button booking */}
          <button className="bookingBtn" onClick={bookTicket}>
            Book
          </button>
          <ToastContainer />
        </div>
      )}

      {/* Two-way active */}
      {selectedOption === 'twoway' && (
        <div className="d-sm-flex flex-sm-column d-md-flex flex-md-row">
          {/* From place */}
          <div className="d-flex flex-row justify-content-start inputBox">
            <RiFlightTakeoffLine className="icons" />
            <div className="d-flex flex-column justify-content-evenly">
              <h1 className="inputDataFlight">Flying From</h1>
              <input
                type="text"
                id="departure"
                value={departure}
                placeholder="Enter From Location"
                className="inputField"
                onChange={(event) => setDeparture(event.target.value)}
              />
            </div>
          </div>
          {/* Destination */}
          <div className="d-flex flex-row justify-content-start inputBox">
            <RiFlightLandLine className="icons" />
            <div className="d-flex flex-column justify-content-evenly">
              <h1 className="inputDataFlight">Destination To</h1>
              <input
                type="text"
                id="arrival"
                value={arrival}
                placeholder="Enter From Location"
                className="inputField"
                onChange={(event) => setArrival(event.target.value)}
                required
              />
            </div>
          </div>
          <div className='d-sm-flex flex-sm-row '>
            {/* Depart time */}
            <div className="inputBoxTwoWay">
              <div className="d-flex flex-column justify-content-evenly">
                <div className="d-flex flex-row">
                  <BsCalendar2 style={{ width: '15px', height: '15px', marginTop: '9px', marginLeft: '10px', marginRight: '5px' }} />
                  <h1 className="inputDataFlight"  style={{marginTop:"3px",marginBottom:"0px"}}>
                    Depart Date
                  </h1>
                </div>
                <DatePicker
                selected={departDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setDepartDate(date)}
                className="customDatePicker"
                placeholderText="23/06/2023" // Display the formatted default date as a placeholder
              />
              </div>
            </div>
            {/* End date */}
            <div className="inputBoxTwoWay">
                <div className="d-flex flex-column justify-content-evenly">
                <div className="d-flex flex-row">
                  <BsCalendar2 style={{ width: '15px', height: '15px', marginTop: '9px', marginLeft: '10px', marginRight: '5px' }} />
                  <h1 className="inputDataFlight"  style={{marginTop:"3px",marginBottom:"0px"}}>
                    Depart Date
                  </h1>
                </div>
                <DatePicker
                selected={endDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setEndDate(date)}
                className="customDatePicker"
                placeholderText="23/06/2023" // Display the formatted default date as a placeholder
              />
              </div>
            </div>
         </div> 
          {/* Persons */}
          <div className="d-flex flex-column inputBox">
              <div className="d-flex flex-row justify-content-center">
              <BsPersonAdd className="icons" />
              <div className='d-flex flex-row justify-content-start'>
                <h1 className="inputDataFlight" style={{marginTop:"15px"}}>Travelers {totalPersons}</h1>
                <MdOutlineArrowDropDown className="openIcon" onClick={openModalBox} />
              </div>
              </div>
            {ismodalOpen && (
              <div className="modal-content-flight" >
                <div className="">
                  <ul className="unOrder ">
                    <li className="  m-0">
                      <div className="d-flex flex-row justify-content-around">
                        <div className=" mt-3">
                          <p style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '600' }}>Adults <br />+12</p>
                        </div>
                        <div className="d-flex flex-row mt-3">
                          <AiOutlineMinusCircle onClick={() => decrementTravelers('adults')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                          <p style={{ marginTop: '3px', marginLeft: '5px', marginRight: '5px' }}>{adults}</p>
                          <AiOutlinePlusCircle onClick={() => incrementTravelers('adults')} style={{ width: '20px', height: '20px', margin: '5px', cursor: 'pointer' }} />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-row justify-content-around ">
                        <div className="mt-3">
                          <p style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '600' }}>Children<br />2 - 11</p>
                        </div>
                        <div className="d-flex flex-row mt-3">
                          <AiOutlineMinusCircle onClick={() => decrementTravelers('children')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                          <p style={{ marginTop: '3px', marginLeft: '5px', marginRight: '5px' }}>{children}</p>
                          <AiOutlinePlusCircle onClick={() => incrementTravelers('children')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                        </div>
                      </div>
                    </li>
                    <li>
                        <div className="d-flex flex-row justify-content-between">
                        <div className="mt-3">
                          <p style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '600', paddingLeft: '20px' }}>
                            Infants<br />-2
                          </p>
                        </div>
                        <div className="d-flex flex-row mt-3">
                          <AiOutlineMinusCircle onClick={() => decrementTravelers('infants')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                          <p style={{ marginTop: '3px', marginLeft: '5px', marginRight: '5px' }}>{infants}</p>
                          <AiOutlinePlusCircle onClick={() => incrementTravelers('infants')} style={{ width: '20px', height: '20px', margin: '5px' }} />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* Button booking */}
          <button className="bookingBtn" onClick={bookTicket}>
            Book
          </button>
          <ToastContainer className="toastContainer" />
        </div>
      )}
    </div>
  );
};

export default FlightSearchBox;
