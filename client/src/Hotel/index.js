import React, { useState, useEffect } from 'react';
import HotelSearchBox from '../components/hotelSearchBox.js';
import HotelFeatures from '../components/hotelFeatures';
import './index.css'
function Hotel() { 
 
  return (
 
    <section >
     <div className='hotelSection' >
      <div className="hotelSearchBox">
          <HotelSearchBox /> 
      </div>
     </div>
    
     <div className='hotelSectuionFeature'>
       <HotelFeatures/>
     </div>
     
    </section>



  );
}

export default Hotel;
