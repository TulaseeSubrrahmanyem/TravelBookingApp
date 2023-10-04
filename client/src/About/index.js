import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
function About() {
  return (
    <div className='aboutPage d-flex flex-column '>
      <h1>About Us</h1>
      <div className='d-flex flex-column justify-content-start'>
      <p style={{marginBottom:"0px"}}> Vivid Wizards providing the best and user friendly application to our customers, with extensive tools specially for online travel business from hotels booking to flights reservation, we also provide custom web solutions and services. With over 4 years of experience Vivid Wizards.com have unquestionably won a reputation for being a trusted source, a reliable partner and an expert in the area of online travel business applications.

      The combination of our services, 24/5 nonstop support, our pricing, friendly way of conducting business, and our compassionate corporate philosophy is very unique in today's business world.</p>
      <p style={{marginBottom:"0px",marginTop:"0px"}}> We pride ourselves on exceptional customer service and strive to build lasting relationships with our customers by making it easy and profitable for them to do business with us.
      
      We value our clients and focus in customer satisfaction. </p>
      <p style={{marginBottom:"0px"}}>That is why after-sale support is a key factor in our approach. With all this rich experience, now through Vivid Wizards we are bound to meet customer satisfaction and establish trust.
      
      If you are looking to enhance your online travel business,Vivid Wizards functions as the best one stop solution with user friendly interface and such a great features with prices that match your budget.</p>
      
      <p>To get in touch with us you can use our support desk system, or feel free to follow us on  or . Please do not hesitate to contact us.</p> 
      </div>
    </div>
  );
}

export default About;
