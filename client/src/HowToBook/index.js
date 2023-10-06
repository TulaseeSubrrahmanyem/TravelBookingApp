import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function HowToBook() {
  return (
    <div className='aboutPage d-flex flex-column '>
    <h1 style={{fontSize:"18px",fontWeight:"600"}}>How to Book</h1>
      <div className='d-flex flex-column justify-content-start p-1'>
     
      
      <h2 style={{fontSize:"18px",fontWeight:"600",marginLeft:"20px",marginBottom:"0px"}}>1. SEARCH</h2>
      <p style={{marginBottom:"0px",marginTop:"0px"}}> Select your trip, type your departure and arrival cities, enter your travel dates and number of passengers.</p>
     
      <h2 style={{fontSize:"18px",fontWeight:"600",marginLeft:"20px",marginBottom:"0px"}}>2. COMPARE </h2>
      <p style={{marginBottom:"0px",marginTop:"0px"}}>Compare available airfares, sorted by cheapest price and departure time. Click 'Select" to continue
      Optional features include:</p>
      <p style={{marginBottom:"0px",marginTop:"0px"}}>a) Search different days by using arrow tabs <br/>
       b) Use filters on the left</p>
     
      <h2 style={{fontSize:"18px",fontWeight:"600",marginLeft:"20px",marginBottom:"0px"}}>3. REVIEW</h2>
      <p style={{marginBottom:"0px",marginTop:"0px"}}>Check and confirm your details, scroll down and select optional extras if required. Enter your email address and click 'Book Now' at the bottom of the page to continue</p>
       <p>Optional extras include:<br/>
       a) Hotels</p>
     
       <h2 style={{fontSize:"18px",fontWeight:"600",marginLeft:"20px",marginBottom:"0px"}}>4. CHECKOUT</h2>
       <p>Add passenger information for all travellers in the space provided directly under your summary</p>

       <h2 style={{fontSize:"18px",fontWeight:"600",marginLeft:"20px",marginBottom:"0px"}}>5. PAYMENT</h2>
       <p>Complete payment with your preferred method, accept terms and conditions, and click option to finalise your booking</p>
       
       <h2 style={{fontSize:"18px",fontWeight:"600",marginLeft:"20px",marginBottom:"0px"}}>6. CONFIRMATION</h2>
       <p>A confirmation page will appear to confirm your booking was successful. You will also be sent a confirmation email within 24 hours which contains all your booking details and important travel information</p>
       
       </div>
    </div>
  );
}

export default HowToBook;
