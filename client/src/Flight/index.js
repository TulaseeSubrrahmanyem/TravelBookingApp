import React from 'react';
import './index.css';
import FlightSearchBox from '../components/flightSearchBox.js';
// import FlightFeatures from '../components/flightFeatures';
function Flight() {
  return (
  
    <section className='' >
    <div className='flightSection' >
     <div className="flightSearchBox">
        <FlightSearchBox/>
     </div>
    </div>
    
   </section>
  );
}

export default Flight;
