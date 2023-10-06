import React, { useState, useEffect } from 'react';
import '../components/bookingDetalsCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BookingDetailsCard = ({
  roomBookingDetails,
  hotelName,
  hotelCity,
  roomName,
  roomPrice,
  CheckInDate,
  CheckOutDate,
  Adults,
  Childs,
}) => {
 
  const numericRoomPrice = parseFloat(roomPrice.replace(/[^\d.]/g, ''));
 // console.log("numaricPrice",numericRoomPrice)
  // Convert CheckInDate and CheckOutDate to a readable format (e.g., string)
  const formattedCheckInDate = new Date(CheckInDate).toDateString();
  const formattedCheckOutDate = new Date(CheckOutDate).toDateString();

  // Assuming checkIndate and checkOutdate are initialized somewhere in your code
  const checkIndate = new Date(CheckInDate);
  const checkOutdate = new Date(CheckOutDate);

  // Calculate the number of days
  const timeDifference = checkOutdate - checkIndate;
  const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

 let totalAmount=numericRoomPrice
 
//  console.log(typeof(totalAmount))
  return (
   // <div className='container'>
   //  <div className='row'>
     
    <div className='bookingDetailsCard '>
      {/* Display the booking details here */}
        <div>
          <h1>Booking Details</h1>
        </div>
        
        <div className='d-flex flex-row justify-content-evenly'>
        {roomBookingDetails.length > 0 ? (
          <ul className="">
            {roomBookingDetails.map((hotel, index) => (
              <li key={index} className="hotel-image">
                <div className='d-flex flex-row justify-content-start'>
                  {hotel.images && hotel.images.length > 0 ? (
                    <div>
                      {hotel.images.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={image.image_urls}
                          alt={`Image of ${hotelName}`}
                          className='DetailsCardImg'
                        />
                      ))}
                      <div className='hotelDetails'>
                        <ul className='star'>
                          {hotel.rating && hotel.rating.length > 0 ? (
                            <li>
                              {Array.from({ length: hotel.rating[0].star_count }).map((_, index) => (
                                <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'gold', width: '12px',alignItems:"left",margin:"0px",padding:"0px", }} />
                              ))}
                            </li>
                          ) : (
                            <li>No rating information available for this hotel.</li>
                          )}
                        </ul>
                        <p className='hotelName'>{roomName} </p>
                        <p className='hotelAddress'>{hotel.address} {hotelCity}</p>
                      </div>
                      <hr/>
                    </div>
                  ) : (
                    <p>No images available for this hotel.</p>
                  )}
                </div>
              <div className='bodypart'>
                <div>
                  <p>Check-In Date : <span style={{marginRight:"50px",color:"#fff",fontWeight:'500'}}>{formattedCheckInDate}</span></p>
                  <p>Check-Out Date : <span style={{marginRight:"50px",color:"#fff",fontWeight:'500'}}>{formattedCheckOutDate}</span></p>                 
                </div>
                <hr/>
                <h3>Room Type</h3>
                <hr/>
                {/* Taxes find */}
                <div>
                  
                  <p> <span style={{color:"#fff",fontWeight:'500'}}>{hotelName}</span></p>
                  <p>Room Price : <span style={{marginRight:"120px",color:"#fff",fontWeight:'500'}}>{roomPrice}</span></p>
                  <p>Number of Days : <span style={{marginRight:"165px",color:"#fff",fontWeight:'500'}}>{numberOfDays}</span></p>
                </div>
                <hr/>
                <div>
                  <p>Subtotal : <span style={{marginRight:"120px",color:"#fff",fontWeight:'500'}}>{roomPrice}</span></p>
                  {hotel.prices && hotel.prices.length > 0 ? (
                    hotel.prices.map((price, priceIndex) => (
                      <div key={priceIndex}>
                        {price.rooms && price.rooms.length > 0 ? (
                          // Assuming you want to display tax information for a room type with the name 'Business Double or Twin Room'
                          price.rooms.find((room) => room.Roomtype === hotelName) ? (
                            <div>
                              <p className="taxtesDetails" >
                                + ₹ {price.rooms.find((room) => room.Roomtype === hotelName)['Taxes and Fees'].replace(/\D/g, '')}  Taxes and Charges
                              </p>
                              {/* Add the tax amount to the total */}
                              <hr/>
                              <div>
                                <p >Total Amount :<span style={{marginRight:"120px",color:"#fff",fontWeight:'500'}}> ₹ {totalAmount += parseFloat(price.rooms.find((room) => room.Roomtype === hotelName)['Taxes and Fees'].replace(/\D/g, ''))}</span> </p>
                              </div> 
                              <hr style={{marginBottom:'30px'}}/>
                            </div>
                          ) : (
                            <p>No tax information available for this room type.</p>
                          )
                        ) : (
                          <p>No room information available for this hotel.</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No price information available for this hotel.</p>
                  )}
                </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div><p>No Data Available</p></div>
        )}
       </div>       
      
    </div>
 
  );
};

export default BookingDetailsCard;
