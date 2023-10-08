import React, { useState, useEffect,useContext } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import axios from 'axios';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import BookingDetailsCard from '../components/bookingDetailsCard.js';

function RoomBooking() {
  
  
  const location = useLocation();
  const { roomBookingDetails,hotelName,hotelCity,roomName,roomPrice ,CheckInDate,CheckOutDate,Adults,Childs} = location.state || {};
  //console.log(roomBookingDetails,roomBookingDetails.city,roomName,roomPrice,CheckInDate,CheckOutDate)
  console.log("dates",CheckInDate,CheckOutDate)
  const initialTraveler = {
    salutation: 'Mr',
    travelerFirstName: '',
    travelerLastName: '',
  };
  

  const [countryList, setCountryList] = useState([]);
  const [formData, setFormData] = useState({
    hotelName: hotelName,
    hotelCity: hotelCity,
    roomName:roomName || '',
    roomPrice: roomPrice ? parseFloat((roomPrice || '').replace('₹', '').replace(',', '')) : 0,
    checkInDate:CheckInDate?CheckInDate.toISOString():'',
    checkOutDate:CheckOutDate?CheckOutDate.toISOString():'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    nationality: 'India',
    currentCountry: 'India',
    travelers: [initialTraveler],
    termsAndConditions: false, // Add this field
    paymentOption: '', // Add this field
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    nationality: '',
    currentCountry: '',
    travelers: [],
    termsAndConditions: '',
    paymentOption: '', // Add this field
  });
 
 
{/*getting country details from API */}
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries data');
        }
        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountryList(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

   
{/*subbimting thr data function */}
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const newErrors = { ...errors };
  let hasError = false;
  let travelerErrorsFound = false; // Flag to track traveler errors

  // Validate personal information
  const personalInfoFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'nationality', 'currentCountry', 'paymentOption', 'termsAndConditions'];

  personalInfoFields.forEach((field) => {
    if (!formData[field]) {
      newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      hasError = true;
    } else {
      newErrors[field] = '';
    }
  });

  // Validate traveler information
  const travelerErrors = formData.travelers.map((traveler, index) => {
    const travelerError = {};

    ['travelerFirstName', 'travelerLastName'].forEach((field) => {
      if (!traveler[field]) {
        travelerErrorsFound = true; // Set the flag to true
        hasError = true;
      } else {
        travelerError[field] = '';
      }
    });

    return travelerError;
  });

  newErrors.travelers = travelerErrors;
  setErrors(newErrors);

  if (!hasError) {
    try {
      const response = await axios.post('https://travelapp-l6go.onrender.com/api/roombookings', formData);
      console.log('Form Data Submitted:', response.data);
      toast.success('Your Booking is Successfully Confirmed', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

         // Clear the form fields on successful submission
         setFormData({
          hotelName: hotelName,
          hotelCity: hotelCity,
          roomName: '',
          roomPrice: 0,
          checkInDate: '',
          checkOutDate: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          nationality: 'India',
          currentCountry: 'India',
          travelers: [initialTraveler],
          termsAndConditions: false,
          paymentOption: '',
        });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } else {
    if (travelerErrorsFound) {
      // Show traveler-related error only if traveler errors were found
      toast.error('Traveler information is incomplete', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    console.log('Errors found. Form not submitted.');
    // You can also display a toast message here or other error handling logic.
  }
};


//ReactSelect Custom-style
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #d3d6da', // Increase the border width
      height: '50px', // Increase the height
      borderRadius: '5px',
      padding: '5px',
      margin: '5px',
      outline: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',
    }),
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTraveler = () => {
    const newTraveler = { ...initialTraveler };
    setFormData({
      ...formData,
      travelers: [...formData.travelers, newTraveler],
    });
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index][field] = value;
    setFormData({ ...formData, travelers: updatedTravelers });
  };
  // Add this function to your component
  const handleRemoveTraveler = (indexToRemove) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers.splice(indexToRemove, 1); // Remove the traveler at the specified index
    setFormData({ ...formData, travelers: updatedTravelers });
  };

  // Payment handling
  const handlePaymentChange = (e) => {
    const selectedPaymentOption = e.target.value;
    console.log('Selected Payment Option:', selectedPaymentOption); // Log the selected option
    setFormData({ ...formData, paymentOption: selectedPaymentOption });
  };

  
  return (
    <div className='bg-light roomBookingMain'>
 
        <h1 className='topHeading'>Room Booking</h1>
        <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row justify-content-md-evenly'>
          <div>
          <form onSubmit={handleFormSubmit}>
            <div className='personalData'>
              <div className='d-flex flex-column justify-content-start'>
                <h2>Personal Information</h2>
                <hr style={{ margin: '0px' }} />
              </div>
              <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row justify-content-md-around mt-3'>
                <div>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : 'inputValues'}
                  />
                  {errors.firstName && <div className='error-message'>{errors.firstName}</div>}
                </div>
                <div>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : 'inputValues'}
                  />
                  {errors.lastName && <div className='error-message'>{errors.lastName}</div>}
                </div>
              </div>
              <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row justify-content-md-around'>
                <div>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : 'inputValues'}
                  />
                  {errors.email && <div className='error-message'>{errors.email}</div>}
                </div>
                <div>
                  <input
                    type='tel'
                    name='phone'
                    placeholder='Phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : 'inputValues'}
                  />
                  {errors.phone && <div className='error-message'>{errors.phone}</div>}
                </div>
              </div>
              <div>
                <input
                  type='text'
                  name='address'
                  placeholder='Address'
                  value={formData.address}
                  onChange={handleInputChange}
                  
                  className={errors.address ? 'error' : 'inputValuesAddress'}
                />
                {errors.address && <div className='error-message'>{errors.address}</div>}
              </div>
              <div className='d-sm-flex d-sm-column d-md-flex flex-md-row justify-content-md-around'>
                <div className='d-flex flex-column justify-content-start mt-2'>
                  <p style={{ fontSize: "16px", fontWeight: "550", textAlign: "left" }}>Nationality</p>
                  <div className='countrySelection'>
                    <Select
                      name='Nationality'
                      value={{
                        label: (
                          <div className='selected-option'>
                            {formData.nationality && countryList.some(country => country.name.common === formData.nationality) ? (
                              <img
                                src={
                                  countryList.find(
                                    (country) =>
                                      country.name.common === formData.nationality
                                  ).flags.png
                                }
                                alt={`${formData.nationality} Flag`}
                                className='country-flag'
                              />
                            ) : null}
                            <p style={{ margin: "10px" }}>{formData.nationality}  </p>
                          </div>
                        ),
                        value: formData.nationality,
                      }}
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          nationality: selectedOption.value,
                        })
                      }
                      options={countryList.map((country) => ({
                        label: (
                          <div className='d-flex flex-row justify-content-start'>
                            <img
                              src={country.flags.png}
                              alt={`${country.name.common} Flag`}
                              className='country-flag'
                            />
                            {country.name.common}
                          </div>
                        ),
                        value: country.name.common,
                      }))}
                      isSearchable
                    />
                    {errors.nationality && <div className='error-message'>{errors.nationality}</div>}
                  </div>
                </div>
                <div className='d-flex flex-column justify-content-start mt-2'>
                  <p style={{ fontSize: "16px", fontWeight: "550", textAlign: "left" }}>Current Country</p>
                  <div className='countrySelection'>
                    <Select
                      name='currentCountry'
                      value={{
                        label: (
                          <div className='selected-option'>
                            {formData.currentCountry && countryList.some(country => country.name.common === formData.currentCountry) ? (
                              <img
                                src={
                                  countryList.find(
                                    (country) =>
                                      country.name.common === formData.currentCountry
                                  ).flags.png
                                }
                                alt={`${formData.currentCountry} Flag`}
                                className='country-flag'
                              />
                            ) : null}
                            <p style={{ margin: "10px" }}>{formData.currentCountry}</p>
                          </div>
                        ),
                        value: formData.currentCountry,
                      }}
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          currentCountry: selectedOption.value,
                        })
                      }
                      options={countryList.map((country) => ({
                        label: (
                          <div className='d-flex flex-row justify-content-start'>
                            <img
                              src={country.flags.png}
                              alt={`${country.name.common} Flag`}
                              className='country-flag'
                            />
                            {country.name.common}
                          </div>
                        ),
                        value: country.name.common,
                      }))}
                      isSearchable
                    />
                    {errors.currentCountry && <div className='error-message'>{errors.currentCountry}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='personalData '>
              <h2>Travellers Information</h2>
              <hr style={{ margin: '0px' }} />
              {formData.travelers.map((traveler, index) => (
                <div key={index} className='d-sm-flex flex-sm-column justify-content-sm-start d-md-flex flex-md-row justify-content-md-center mt-2'>
                  
                <div className='d-flex flex-row d-md-flex'>
                <Select
                    className='customSelect'
                    name='salutation'
                    value={{
                      label: traveler.salutation,
                      value: traveler.salutation,
                    }}
                    onChange={(selectedOption) =>
                      handleTravelerChange(index, 'salutation', selectedOption.value)
                    }
                    options={[
                      { value: 'Mr', label: 'Mr' },
                      { value: 'Miss', label: 'Miss' },
                      { value: 'Mrs', label: 'Mrs' },
                    ]}
                    styles={customStyles}
                  />
                  <div>
                    {index === 0 ? (
                      <div className='addBtn d-md-none' onClick={handleAddTraveler}>
                        <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#d3d6da', fontSize: '30px', margin: "4px" }} />
                      </div>
                    ) : (
                      <div className='removeBtn d-md-none' onClick={() => handleRemoveTraveler(index)}>
                        <FontAwesomeIcon icon={faCircleMinus} style={{ color: '#d3d6da', fontSize: '30px', margin: "4px" }} />
                      </div>
                    )}
                   </div> 
                  </div>
                  <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row justify-content-md-center'>
                    <div>
                      <input
                        type='text'
                        placeholder='First Name'
                        value={traveler.travelerFirstName}
                        onChange={(e) =>
                          handleTravelerChange(
                            index,
                            'travelerFirstName',
                            e.target.value
                          )
                        }
                        className={errors.travelers[index]?.travelerFirstName ? 'errorTraveller' : 'travellersInput'}
                      />
                      {errors.travelers[index]?.travelerFirstName && (
                        <div className='error-message'>{errors.travelers[index]?.travelerFirstName}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type='text'
                        placeholder='Last Name'
                        value={traveler.travelerLastName}
                        onChange={(e) =>
                          handleTravelerChange(
                            index,
                            'travelerLastName',
                            e.target.value
                          )
                        }
                        className={errors.travelers[index]?.travelerLastName ? 'errorTraveller' : 'travellersInput'}
                      />
                      {errors.travelers[index]?.travelerLastName && (
                        <div className='error-message'>{errors.travelers[index]?.travelerLastName}</div>
                      )}
                    </div>
                  </div>
  
                  {index === 0 ? (
                    <div className='addBtn d-none d-md-block' onClick={handleAddTraveler}>
                      <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#d3d6da', fontSize: '30px', margin: "10px" }} />
                    </div>
                  ) : (
                    <div className='removeBtn  d-none d-md-block' onClick={() => handleRemoveTraveler(index)}>
                      <FontAwesomeIcon icon={faCircleMinus} style={{ color: '#d3d6da', fontSize: '30px', margin: "10px" }} />
                    </div>
                  )}
                </div>
              ))}
            
            </div>
            {/* Payment */}
            <div className='personalData '>
              <h2>Select a Payment Option:</h2>
              <hr style={{ margin: '0px' }} />
              <div className='payment-options-grid'>
              <div className='payment-option' htmlFor='paypal'>
                <input
                  type="radio"
                  id="paypal"
                  name="paymentOption"
                  value="paypal" // Unique value for PayPal
                  checked={formData.paymentOption === 'paypal'}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="paypal" className='d-flex flex-row justify-content-evenly'>
                  <img src='https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png' style={{ width: "100px", height: "40px" }} />
                </label>
              </div>
              <div className='payment-option' htmlFor="googlepay">
                <input
                  type="radio"
                  id="googlepay"
                  name="paymentOption"
                  value="googlepay" // Unique value for Google Pay
                  checked={formData.paymentOption === 'googlepay'}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="googlepay" className='d-flex flex-row justify-content-evenly'>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBop6IB0_kvCubqocHH82cHC1GPleEirQ2AA&usqp=CAU' style={{ width: "150px", height: "40px", padding: "5px" }} />
                </label>
              </div>
              <div className='payment-option' htmlFor="upi">
                <input
                  type="radio"
                  id="upi"
                  name="paymentOption"
                  value="upi" // Unique value for UPI
                  checked={formData.paymentOption === 'upi'}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="upi" className='d-flex flex-row justify-content-evenly'>
                  <img src='../images/upi.png' style={{ width: "150px", height: "40px", padding: "5px" }} />
                </label>
              </div>
              <div className='payment-option' htmlFor="paylater">
                <input
                  type="radio"
                  id="paylater"
                  name="paymentOption"
                  value="paylater" // Unique value for Pay Later
                  checked={formData.paymentOption === 'paylater'}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="paylater" className='d-flex flex-row justify-content-evenly'>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA79wMp25qAK3bbsDKwdFeiqLxwvF52nNfQw&usqp=CAU' style={{ width: "120px", height: "40px", padding: "5px" }} />
                </label>
              </div>
              {errors.paymentOption && <div className='error-message'>{errors.paymentOption}</div>}
            </div>    
            </div>
  
              <div className="termsAndAgreement ">
                <input 
                type='checkbox'
                id='termsAndCondition'
                value='termsCondition'
                checked={formData.termsAndConditions}
                onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAndConditions: e.target.checked,
                    })
                  }
                />
                <label htmlFor='termsAndCondition' style={{fontSize:"14px",fontWeight:"500"}}>I agree to all <span style={{color:"#007bff"}}>Terms & Condition</span></label>
                {errors.termsAndConditions && <div className='error-message'>Please agree to the terms and conditions.</div>}
                </div>
            <button type='submit' className='submitBtn '>Confirm Booking</button>
          </form>
          </div>
      
          <div>
              <BookingDetailsCard
                roomBookingDetails={roomBookingDetails}
                hotelName={hotelName}
                hotelCity={hotelCity}
                roomName={roomName}
                roomPrice={roomPrice}
                CheckInDate={CheckInDate}
                CheckOutDate={CheckOutDate}
                Adults={Adults}
                Childs={Childs}
                // taxPrices={taxPrices}
            />
        
          </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default RoomBooking;
