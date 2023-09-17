import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

import './index.css'; // Import the CSS file

function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className='navBar'>
        <Container>
          {/* Logo */}
          <Navbar.Brand href="/">
            <img src="images/logo_2.png" alt="Logo" height="50" className="d-inline-block align-top" />
          </Navbar.Brand>
          
          {/* Mobile navigation toggle */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Navigation links */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/hotel" className="nav-link" activeclassname="active">Hotel</NavLink>
              <NavLink to="/flight" className="nav-link" activeclassname="active">Flight</NavLink>
              <NavLink to="/about" className="nav-link" activeclassname="active">About</NavLink>
              <NavLink to="/offers" className="nav-link" activeclassname="active">Offers</NavLink>
              
            </Nav>

            {/* Login and Sign Up buttons */}
            <Nav>
              <Button className="me-5 loginBtn">Login</Button>
              <Button className="signupBtn">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Horizontal rule */}
      <hr className='hrLine' />
    </>
  );
}

export default Header;
