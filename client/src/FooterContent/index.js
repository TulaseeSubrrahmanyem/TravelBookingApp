import React,{useEffect} from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import './index.css';

function Footer() {
 
 

  return (
    <div className='footerMain '>
    <footer className=" mt-5">
    <h4>Vivid Wizards mission is to make travel accessible, seamless, and unforgettable for everyone.</h4>
    <div className="footer-content">
      <div className="footer-section">
        <img src="../images/logo_2.png" alt="Logo" height="50" className="d-inline-block align-top" />
        <div className='mt-4'>
        <a href="mailto:contact@VividWizards.com?subject=Hello%20Vivid%20Wizards&body=I%20have%20a%20question%20about%20your%20services." style={{ color: "#007bff", textDecoration: "none" }}>
          contact@VividWizards.com
        </a>
        <div className='mt-2'>
          <p>(+91) 98765-43210</p>
        </div>
        <div className='mt-1'>
          <a href="mailto:contact@VividWizards.com?subject=Hello%20Vivid%20Wizards&body=I%20have%20a%20question%20about%20your%20services." style={{ color: "#007bff", textDecoration: "none" }}>
            Contact Us
          </a>
        </div>
      </div>
      
      </div>
      <div className="footer-section">
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/offers">Offers</a></li>
          <li><a href="/careers">Careers</a></li>
          {/*<li><a href="/services">Services</a></li> */}
        </ul>
      </div>
      <div className="footer-section">
        <ul>
          <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
          <li><a href="/TermsOfUSe">Terms of Use</a></li>
          <li><a href="/howToBook">How To Book</a></li>
         {/*<li><a href="/FAQ">FAQ</a></li>*/}
        </ul>
      </div>
      <div className="footer-section">
      <h5 style={{textAlign:"center"}}>Follow Us</h5>
      <div className="social-icons">
          <a href="#"> 
          <IconButton>
          <FacebookIcon />
          </IconButton>
         </a>
          <a href="#">
           <IconButton>
           <LinkedInIcon />
           </IconButton>
         </a>
          <a href="#">
           <IconButton>
           <InstagramIcon />
           </IconButton>
         </a>
          <a href="#">
          <IconButton>
          <TwitterIcon />
          </IconButton>
          </a>
      </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Vivid Wizards All Rights Reserved.</p>
    </div>
  </footer>
  </div>
);    
}

export default Footer;
