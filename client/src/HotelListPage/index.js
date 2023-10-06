import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar, faLocationDot, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import HotelSearchBox from '../components/hotelSearchBox.js';
import './index.css';
import Pagination from '../Pagination/pagination';
import GoogleMap from '../googleMap/googleMap';
import HotelFeatures from '../components/hotelFeatures';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HotelListPage() {
  const location = useLocation();
  const locationState = location.state || {};
 // console.log("localstae",locationState)
  const [isLoading, setIsLoading] = useState(true);
  // Destructuring the properties with default values
  const {
    hotels: hotelsWithImagesAndData = [],
    city: searchedCity = '',
    error: errorMessage = '',
    checkInDate:CheckInDate='',
    checkOutDate:CheckOutDate=''
  } = locationState;
  //console.log(location)
  // const hotelsWithImagesAndData = location.state?.hotels || [];
  // const searchedCity = location.state?.city || '';
  // const errorMessage = location.state?.error || '';

  const latitudes = hotelsWithImagesAndData.map((hotel) => hotel.latitude);
  const longitudes = hotelsWithImagesAndData.map((hotel) => hotel.longitude);
  const [sortingCriteria, setSortingCriteria] = useState('lowToHigh');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [currentHotels, setCurrentHotels] = useState([]);
  const [activeButton, setActiveButton] = useState('default');
  const [imageError, setImageError] = useState('');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [searchHotelName, setsearchHotelName] = useState('');
  const [minStarRating,setminStarRating]=useState([]);
  const [roomTypes,setRoomTypes]=useState([])
  const navigate = useNavigate();
 
 useEffect(() => {
    try {
      console.log('Starting useEffect');
      let filteredData = [...hotelsWithImagesAndData];
  
        // Check if hotelsWithImagesAndData is empty
      if (filteredData.length === 0) {
        setIsLoading(false); // Set isLoading to false immediately
        return; // Exit the useEffect
      }

      filteredData = filteredData.filter((hotel) => {
        const price = parseInt(hotel.prices[0].rooms[0].Price[0].replace(/[^\d]/g, ''), 10);
        const hotelName = hotel.name.toLowerCase();
        const searchQuery = searchHotelName.toLowerCase();

        // Filter based on price range
        const isPriceInRange = price >= priceRange[0] && price <= priceRange[1];

        // Filter based on star rating
        const isStarRatingMatched = minStarRating.length === 0 || minStarRating.includes(hotel.rating[0].star_count);

        // Filter based on hotel name
        const isHotelNameMatched = hotelName.includes(searchQuery);

        return isPriceInRange && isStarRatingMatched && isHotelNameMatched;
      });
      console.log('Filtering complete');
      // Sort the filtered data based on the selected criteria
      if (sortingCriteria === 'lowToHigh') {
        filteredData.sort((a, b) => {
          const priceA = parseInt(a.prices[0].rooms[0].Price[0].replace(/[^\d]/g, ''), 10);
          const priceB = parseInt(b.prices[0].rooms[0].Price[0].replace(/[^\d]/g, ''), 10);
          return priceA - priceB;
        });
      } else if (sortingCriteria === 'highToLow') {
        filteredData.sort((a, b) => {
          const priceA = parseInt(a.prices[0].rooms[0].Price[0].replace(/[^\d]/g, ''), 10);
          const priceB = parseInt(b.prices[0].rooms[0].Price[0].replace(/[^\d]/g, ''), 10);
          return priceB - priceA;
        });
      } else if (sortingCriteria === 'rating') {
        filteredData.sort((a, b) => (a.rating[0].star_count < b.rating[0].star_count ? 1 : -1));
      }
      console.log('Sorting complete');
      // Set the current hotels based on the sorting criteria and paginatio
      // Update the active sorting button
      setActiveButton(sortingCriteria);
      console.log('Setting current hotels');
      console.log('completed')
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false after a certain duration (adjust as needed)
      }, 1000);

       setCurrentHotels(filteredData.slice(indexOfFirstItem, indexOfLastItem));
        // Introduce a timeout to simulate loading
        
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      return [];
    }
  },[sortingCriteria, indexOfFirstItem, indexOfLastItem, hotelsWithImagesAndData, priceRange, searchHotelName, minStarRating]);
 //
  


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (criteria) => {
    console.log(`Sorting by ${criteria}`);
    // Update the sorting criteria
    setSortingCriteria(criteria);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
    //console.log("price",value)
  };
  const handleRatingCheckboxChange = (rating) => {
    // Toggle the selection of the rating
    if (minStarRating.includes(rating)) {
      setminStarRating(minStarRating.filter((selected) => selected !== rating));
    } else {
      setminStarRating([...minStarRating, rating]);
    }
  };
  //text reducing address text
  function truncateText(text, maxLength) {
    text = text.trim(); // Trim leading and trailing spaces
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  
  const handleDetailsClick = async(hotelName) => {
    console.log('Hotel Name:', hotelName);
    try {
      // Make an API request to fetch room details for the selected hotel
      const response = await axios.get(`http://localhost:8080/api/hotels/roomsDetails`,{
        params:{
          hotelName:hotelName
        }
      });
      console.log(hotelName)
      if(response.data){
      console.log('Room Details:', response.data);
      //console.log('Dates:',locationState.CheckInDate,locationState.CheckOutDate)
      setRoomTypes(response.data)
      navigate('/hotel/roomdetails', { state: { roomTypes: response.data,CheckInDate:locationState.CheckInDate,CheckOutDate:locationState.CheckOutDate,Adults:locationState.adults,Childs:locationState.children,errorMessage:'',hotelsWithImagesAndData,searchedCity} });
      }else{
        console.error('Empty response from the server');
        toast('Empty response from the server')
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
      // Log the error message and response data
      console.log('Error Message:', error.message);
      console.log('Response Data:', error.response ? error.response.data : 'No response data');
      navigate('/hotel/roomdetails', { state: { error: error.message, roomTypes: [] } });
    }
  
    // You can also perform any other actions related to displaying hotel details here.
  };
  
  return (
    <div className='hotelListPage bg-light m-0 p-0'>
    {isLoading ?(<div className='d-flex flex-row justify-content-center'>Loading ...</div>):
    ( 
    <>
      <div className="d-flex flex-column justify-content-center align-item-center hotelSearch">
          <HotelSearchBox />
      </div>
  
        <div className='container'>
          <div className='row'>
            {hotelsWithImagesAndData.length > 0 ? (
              <div className='m-0 p-0 w-100'>
              <div className='d-sm-flex d-sm-column d-md-flex flex-md-row justify-content-md-between'>
                
                    {/*slider search options */}  
                  <div className='d-flex flex-column  side-slide-card'>
                    <div className="price-range-slider-container">
                      <p style={{fontSize:"16px",fontWeight:"600",textAlign:"start"}}>Price </p>
                      <div className="slider-labels">
                        <div className="min-value">
                          {priceRange[0]} INR
                        </div>
                        <div className="max-value">
                          {priceRange[1]} INR
                        </div>
                      </div>
                      <Slider
                        range
                        min={0}
                        max={30000}
                        step={100}
                        value={priceRange}
                        onChange={handleSliderChange}
                        handleStyle={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        }}
                        trackStyle={{
                          backgroundColor: '#007bff',
                          height: '8px',
                        }}
                                      
                      />
                    </div>
                    <hr/>
                  {/*hotel name to search */}
                    <div className='d-flex flex-column justify-content-start search-by-name'>
                    <label htmlFor='hotelName' style={{fontSize:"16px",fontWeight:"600",textAlign:"start",marginBottom:"10px"}}>Search by Name</label>
                      <input
                        type="text"
                        id="hotelName"
                        placeholder='Hotel Name'
                        value={searchHotelName} // Bind the input value to the state
                        onChange={(e) => {
                          setsearchHotelName(e.target.value); // Update the state with the new value
                        }}
                    />
                    </div>
                    <hr/>
                  {/*rating by search */}
                    <div className="rating-checkboxes d-flex flex-column  pb-3">
                      <p style={{fontSize:"16px",fontWeight:"600",alignItem:"start"}}>Star Rating </p>
                      <label>
                        <input
                          type="checkbox"
                          checked={minStarRating.includes(5)} // Check if 1-star rating is selected
                          onChange={() => handleRatingCheckboxChange(5)} // Handle checkbox change
                        />
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold', width: '12px' }} />
                        ))}
                        </label>
                        <label>
                        <input
                          type="checkbox"
                          checked={minStarRating.includes(4)} // Check if 1-star rating is selected
                          onChange={() => handleRatingCheckboxChange(4)} // Handle checkbox change
                        />
                        {Array.from({ length: 4 }).map((_, index) => (
                          <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold', width: '12px' }} />
                        ))}
                      </label>
                      <label>
                      <input
                        type="checkbox"
                        checked={minStarRating.includes(3)} // Check if 3-star rating is selected
                        onChange={() => handleRatingCheckboxChange(3)} // Handle checkbox change
                      />
                      {Array.from({ length: 3 }).map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold', width: '12px' }} />
                      ))}
                      
                    </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={minStarRating.includes(2)} // Check if 1-star rating is selected
                          onChange={() => handleRatingCheckboxChange(2)} // Handle checkbox change
                        />
                        {Array.from({ length: 2 }).map((_, index) => (
                          <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold', width: '12px' }} />
                        ))}
                      </label> 
                      <label>
                        <input
                          type="checkbox"
                          checked={minStarRating.includes(1)} // Check if 1-star rating is selected
                          onChange={() => handleRatingCheckboxChange(1)} // Handle checkbox change
                        />
                        {Array.from({ length: 1 }).map((_, index) => (
                          <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold', width: '12px' }} />
                        ))}
                      </label>
                    </div>
                  </div>
                  {/*price range to sorting */} 
                  <div className='d-flex flex-column justify-content-center itemsDetailsSide'> 
                     {/*hotelDetailBar */} 
                     <div className='hotelDetailBar'>
                      <div className=' d-flex flex-row justify-content-between '>
                        <p>{hotelsWithImagesAndData.length} Properties found</p>
                        <p>{searchedCity}</p>
                      </div>
                     </div>
                      {/*feature bar */}
                      <div className='featuresBar'>
                        <div className='d-sm-flex flex-sm-column  d-md-flex flex-md-row justify-content-md-evenly'>
                          <button
                            className={`sortButton ${activeButton === 'lowToHigh' ? 'active leftCorner' : ''}`}
                            onClick={() => handleSort('lowToHigh')}
                          >
                            Lowest to Higher
                          </button>
                          <hr className='hr-line' />
                          <button
                            className={`sortButton ${activeButton === 'highToLow' ? 'active' : ''}`}
                            onClick={() => handleSort('highToLow')}
                          >
                            Highest to Lower
                          </button>
                          <hr className='hr-line' />
                          <button
                            className={`sortButton ${activeButton === 'rating' ? 'active rightCorner' : ''}`}
                            onClick={() => handleSort('rating')}
                          >
                            Star Rating
                          </button>
                        </div>
                      </div>
                      <div className='hotelImtesList d-flex flex-column justify-content-center'>  
                       <ul >
                        {currentHotels.map((hotel,index) => (
                          <li key={hotel.id} className="itemsListCard">
                            <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row justify-content-md-start '>
                              {hotel.images && hotel.images.length > 0 ? (
                                <div>
                                  {hotel.images.map((image) => (
                                    <img
                                      key={image._id}
                                      src={image.image_urls}
                                      alt={`Image of ${image.hotel_name}`}
                                      className='hotelImg'
                                      
                                    />
                                  ))}
                                </div>
                              ) : (
                                <p>No images available for this hotel.</p>
                              )}
                              <div className='p-3 w-100'>
                                <div className='d-sm-flex flex-sm-row justify-content-sm-start d-md-flex flex-md-row justify-content-md-between '>
                                  <h3 className='hotelName'> {truncateText(hotel.name,50)}</h3>
                                  <div className='d-sm-flex flex-sm-row'>
                                    <ul className='star'>
                                      {hotel.rating && hotel.rating.length > 0 ? (
                                        <li>
                                          {Array.from({ length: hotel.rating[0].star_count }).map((_, index) => (
                                            <FontAwesomeIcon icon={faStar} key={index} className="hotelRating"  />
                                          ))}
                                        </li>
                                      ) : (
                                        <li>No rating information available for this hotel.</li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                                <div className='d-flex flex-row justify-content-start'>
                                  <FontAwesomeIcon icon={faLocationDot} style={{ color: 'rgb(116, 115, 115)', margin: '4px' }} />
                                  <p className='hotelAddress'>
                                    {hotel.city ? hotel.city.trim() : ''},
                                    {hotel.address ? truncateText(hotel.address, 75) : ''}
                                  </p>
                                </div>
                                <div className='d-flex flex-row justify-content-between p-1'>
                                  <p className='hotelPrice'>
                                    {' '}
                                    {hotel.prices && hotel.prices.length > 0
                                      ? hotel.prices[0].rooms[0].Price[0]
                                      : 'No price information available'}
                                  </p>
                                  <button className='detailsButton' onClick={()=>handleDetailsClick(hotel.name)}>Details <FontAwesomeIcon icon={faAngleRight} style={{ margin: '3px' }} /></button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(hotelsWithImagesAndData.length / itemsPerPage)}
                      onPageChange={handlePageChange}
                    
                    />
                      </div>
                  </div>
                </div>
              </div>
            
            ) : (
              <div className='errorContainer'>
                <Link to='/hotel' className='backSearch'>Back To Search</Link>
                <img src={"images/errorImg.jpg"} alt="Server Error 404" className='errorImg' />
                <p className='errorMsg'>No hotels available for the specified city.</p>
              </div>
            )}
          </div>
        </div>
          <div>
          {/* <HotelFeatures />*/}
          <ToastContainer
          position='top-center' // Centered at the top of the screen
          autoClose={3000}  
        />
      </div>
      </>
   ) }  
   
    </div>
  );
}

export default HotelListPage;
