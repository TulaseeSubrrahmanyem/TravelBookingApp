import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot,faCheck, faAngleRight,faUser } from '@fortawesome/free-solid-svg-icons';
import { faCircle ,faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import { useLocation,useNavigate } from 'react-router-dom';
import MapsMobalBox from '../MapsModalBox';
import {Link} from 'react-router-dom'
import { ToastContainer ,toast} from 'react-toastify';
import { noConflict } from 'leaflet';

function HotelRoomDetails() {
  
  const location = useLocation();
  const { roomTypes,CheckInDate,CheckOutDate,Adults,Childs,errorMessage,hotelsWithImagesAndData, searchedCity } = location.state || {};
  console.log("CheckInDate,CheckOutDate",CheckInDate,CheckOutDate,Adults,Childs)
  const navigate=useNavigate()
  // room,roomData.Roomtype ,room.city,room.name,roomData.Price[guestIndex]
  const hotleBookingBtn=(room,hotelName,hotelCity,roomName,roomPrice) =>{
    //console.log("Hotel booking",roomPrice,roomName,travellers)
     navigate('/room/booking',{ state: {roomBookingDetails:roomTypes,hotelName:hotelName,hotelCity:hotelCity,roomName:roomName,roomPrice:roomPrice,CheckInDate:CheckInDate,CheckOutDate:CheckOutDate,Adults:Adults,Childs:Childs} })
  }
  return (
    <div className='hotelRoomDetails bg-light'>
      <div className='container'>
        <div className='row '>
          <div className='d-flex flex-row justify-content-evenly pt-5 pb-0 '>
           <a href="/hotel" style={{ color: '#007bff', textDecoration: 'none',margin:"20px",marginTop:"30px" }}>Home</a>
          
             <button
              onClick={() => {
                navigate('/hotel/hotelsList', {
                  state: {
                    hotels: hotelsWithImagesAndData,
                    city: searchedCity,
                    CheckInDate:CheckInDate,
                    CheckOutDate:CheckOutDate,
                    error: errorMessage,
                    // Include any other necessary data from this page
                  },
                  replace: true,
                });
              }}
              style={{ color: '#007bff', textDecoration: 'none',margin:"20px",border:"none",outline:'none',background:'none',marginTop:"30px" }}
            >
              Go back
            </button>


          </div>
        
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {roomTypes && roomTypes.length > 0 ? (
            <ul>
          
              {roomTypes.map((room, index) => (
                <li key={index}>
               
                  <div className='detailsCard'>
                    <div key={room.id}>
                      <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row'>
                        <h3>{room.name}</h3>
                        <ul className='star1'>
                          {room.rating && room.rating.length > 0 ? (
                            <li>
                              {Array.from({ length: room.rating[0].star_count }).map((_, index) => (
                                <FontAwesomeIcon icon={faStar} key={index} className='hotelRating1' />
                              ))}
                            </li>
                          ) : (
                            <li>No rating information available for this hotel.</li>
                          )}
                        </ul>
                      </div>
                      <div className='d-flex flex-row justify-content-start'>
                        <FontAwesomeIcon icon={faLocationDot} style={{ color: 'rgb(116, 115, 115)', margin: '4px' }} />
                        <p>{room.address},{room.city}</p>
                      </div>
                    </div>
                    {room.images && room.images.length > 0 ? (
                      <div className='d-flex flex-row justify-content-start mt-4'>
                        {room.images.map((image, index) => (
                          <div key={image.hotel_id + index}>
                            <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row'>
                              <div className="d-flex flex-row">
                                {image.image_urls.slice(0, 1).map((img, i) => (
                                  <img
                                    key={`large-${image.hotel_id}-${i}`}
                                    src={img}
                                    alt={`Image ${i + 1} of ${image.hotel_name}`}
                                    className='large-images'
                                  />
                                ))}
                              </div>
                              <div className='d-flex flex-column'>
                                <div>
                                  {image.image_urls.slice(1, 3).map((img, i) => (
                                    <img
                                      key={`small-${image.hotel_id}-${i}`}
                                      src={img}
                                      alt={`Image ${i + 1} of ${image.hotel_name}`}
                                      className="medium-images"
                                    />
                                  ))}
                                </div>
                                <div className='d-none  d-md-flex'>
                                 <div>
                                  {image.image_urls.slice(3, 6).map((img, i) => (
                                    <img
                                      key={`small-${image.hotel_id}-${i}`}
                                      src={img}
                                      alt={`Image ${i + 1} of ${image.hotel_name}`}
                                      className="small-images "
                                    />
                                  ))}
                                </div>
                                </div>                               
                              </div>
                               {/*mobile */}
                              
                               <div className='d-flex flex-row d-md-none '>
                                {image.image_urls.slice(3, 5).map((img, i) => (
                                  <img
                                    key={`small-${image.hotel_id}-${i}`}
                                    src={img}
                                    alt={`Image ${i + 1} of ${image.hotel_name}`}
                                    className="small-images "
                                  />
                                ))}
                              </div>
                           
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No images available for this hotel.</p>
                    )}
                    <div className='addressWithGps d-flex flex-row'>
                      <FontAwesomeIcon icon={faLocationDot} style={{ color: 'rgb(116, 115, 115)', margin: '4px' }} />
                      <p>{room.address}</p>
                      <MapsMobalBox 
                      lat={parseFloat(room.latitude)} 
                      lng={parseFloat(room.longitude)} 
                      hotelName={room.name}
                      hotelAddress={room.address} />
                    </div>
                  </div>
                  {/*room types prices details */}
                  <h2 style={{fontSize:"18px",float:"left",margin:"20px",fontWeight:"550"}}>Hotel Rooms Prices</h2>
                  <div>
                 
                    {room.prices && room.prices.length > 0 ? (
                      room.prices.map((roomPrice, roomTypeIndex) => (
                        <div key={roomTypeIndex} className='mt-5'>
                         
                        
                              {roomPrice.rooms.map((roomData, roomIndex) => (
                               <div className='roomPricesCard '>
                                <table className="roomPriceTable">
                                <thead className='d-none d-md-block'>
                                  <tr className=' d-flex flex-row justify-content-around'>
                                    <th className='col-2 text-center'>Room Type</th>
                                    <th className=' col-2 text-center' style={{marginLeft:"55px",marginRight:"0px"}}>Travellers</th>
                                    <th className='col-2 text-center'>Available Offers</th>
                                    <th className='col-5 text-center'>Price</th>
                                    
                                  </tr>
                                </thead>
                                <tbody className=' pt-3'>
                                <tr key={roomIndex}>
                                  <td>
                                    <div className='d-sm-flex d-sm-column d-md-flex flex-md-row justify-content-md-between'>
                                      <div className='d-flex flex-column  mt-2 col-md-3 p-md-3'>
                                        <h3 className='roomTypeName'>{roomData.Roomtype}</h3>
                                        {/* Display other room price details here */}
                                        <ul>
                                          {roomData.Facilities && roomData.Facilities.length > 0 ? (
                                            [...new Set(roomData.Facilities)].map((facility, facilityIndex) => (
                                              <li key={facilityIndex} className=' facilityies'>
                                                <FontAwesomeIcon icon={faCheck} style={{color: "#0ecd25",margin:"5px"}} /> {facility}
                                              </li>
                                            ))
                                          ) : (
                                            <li>No facilities available for this room.</li>
                                          )}
                                        </ul>
                                      </div>
                                      <hr className="verticalLine"/>
                                   
                                      <div className='d-flex flex-column justify-content-evenly m-2 col-md-10'>
                                      {/* Number of guests, available offers, and taxes/fees */}
                                      
                                      {roomData["Number of Guests"].map((guests, guestIndex) => (
                                        <div key={guestIndex}>
                                     
                                          <div className='d-md-flex flex-md-row justify-content-md-evenly '>
                                            {/* Number of guests */}

                                            <div className='col-md-1 mt-4 '>
                                              <ul className='d-flex flex-row'>
                                                {Array.from({ length: guests }).map((_, iconIndex) => (
                                                  <li key={iconIndex}>
                                                    <FontAwesomeIcon
                                                      icon={faUser}
                                                      style={{ color: "#00000", margin: '5px' }}
                                                    />
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            <hr className="verticalLine"/>
                                            {/* Available offers */}
                                            <div className='col-md-2  m-md-3 mb-2 '>
                                              {roomData["Available offers"] && roomData["Available offers"].length > 0 ? (
                                                <ul>
                                                  {roomData["Available offers"].map((offer, offerIndex) => (
                                                    <li key={offerIndex} >
                                                    <div className='d-flex flex-row'>
                                                     <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#0ecd25",fontSize:"15px",margin:"5px" }} /> 
                                                      <p style={{margin:"3px",color:"#0ecd25",fontSize:"12px",textDecoration:"underline"}}> {offer}</p>
                                                    </div>                                                      
                                                    </li>
                                                  ))}
                                                </ul>
                                              ) : (
                                                <p>No available offers for this room.</p>
                                              )}
                                            </div>                                       
                                            <hr className="verticalLine"/>
                                        
                                            {/* Taxes and Fees */}
                                            <div className='mt-sm-4 col-md-6 mt-md-2  '>
                                              <ul>
                                                <li>
                                                <div  className='d-flex flex-row justify-content-evenly p-2 col-md-11'>
                                                  <div className='d-flex flex-column justify-content-start ml-3 '>
                                                    <p style={{fontSize:"20px",fontWeight:"550",marginBottom:"0px",}}>{roomData.Price[guestIndex]}</p>
                                                    <p  className='rommTaxes'>{roomData['Taxes and Fees'] && `  ${roomData['Taxes and Fees']}`}</p>
                                                  </div>
                                                  <div className=''>
                                                     <button type='button' className='bookingButton' onClick={()=>{hotleBookingBtn(room,roomData.Roomtype ,room.city,room.name,roomData.Price[guestIndex])}}>Book Now</button>
                                                  </div>                                                  
                                                </div>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    </div>
                                    
                                  </td>
                                </tr>
                                </tbody>
                                </table>
                               </div> 
                              ))}
                              
                         </div>
                      ))
                    ) : (
                      <p>No room price details available</p>
                    )}
                  </div>
                    </li>
                  ))}
             </ul>
                ) : (
                  <p>No room details available</p>
                )}
                
              </div>
            </div>
            <ToastContainer
            position='top-center' // Centered at the top of the screen
            autoClose={3000}  
          />
       </div>
  );
}

export default HotelRoomDetails;
