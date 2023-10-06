import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'react-bootstrap';
import { Rating } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./hotelFeatures.css";
  const HotelFeatures = () => {
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using an async function
    const fetchData = async () => {
      try {
        const response = await fetch('https://hotelsdata.onrender.com/hotelFeatures');
        const data = await response.json();
        setHotelData(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Check if hotelData is still empty or loading
  if (hotelData.length === 0) {
    return <div className='d-flex flex-row justify-content-center'>Loading...</div>;
  }

  return (
    <div className="hotelFeature ">
      <h1 >Featured Hotels</h1>
      <Carousel indicators={false}>
        {hotelData.map((hotel, index) => {
          if (index % 4 === 0) {
            return (
              <Carousel.Item key={index} >
                <div className="row">
                  {hotelData.slice(index, index + 4).map((hotelChunk) => (
                    <div key={hotelChunk.id} className="col-md-3">
                      <div className="hotelCard mb-4">
                        <img
                          className="hotelCardImg"
                          src={hotelChunk.image}
                          alt={`Hotel ${hotelChunk.id}`}
                        />
                        <div className="d-flex flex-column  p-2">
                        <Rating  className="cardRating"  sx={{ fontSize:15 }} name="hotel-rating" value={hotel.rating} precision={0.5} readOnly />
                         
                          <h5 className="hotelCardName ">{hotelChunk.hotelName}</h5>
                          <p className="hotelCardLocation "><LocationOn fontSize="small" /> {hotelChunk.location}</p>
                          <hr/>
                          <div className='d-flex flex-row justify-content-between'>
                          <p className='mt-1'>
                            INR{' '}
                            <span style={{ fontWeight: 'bold',fontSize:'16px' }}>{hotel.currency.split(' ')[1]}</span>
                          </p>
                          <button type='button' className='detailButton'>Details   <ArrowForwardIosIcon style={{ fontSize: '12px',marginLeft:'4px',marginBottom:"3px" }} /> </button>
                          </div>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            );
          }
          return null;
        })}
      </Carousel>
    </div>
  );
};

export default HotelFeatures;
