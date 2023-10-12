import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { store } from '../App';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import './index.css';
import IconButton from '@mui/material/IconButton';
//import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
function Header() {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const location = useLocation();

  const decodeToken = (jwtToken) => {
    try {
      return jwtDecode(jwtToken);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('jwtToken');

    if (storedToken) {
      const decodedToken = decodeToken(storedToken);

      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setToken(storedToken);
      } else {
        Cookies.remove('jwtToken');
      }
    }
  }, [setToken]);

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    localStorage.removeItem('jwtToken');
    setToken(null);
    navigate('/');
  };

  const userName = token ? decodeToken(token)?.user?.name : null;
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signUp');
  };
  const profileBtn = () => {
    navigate('/myDashboard');
  };

  const renderAuthButtons = () => {
    if (token) {
      if (token.startsWith('jwtSecrete')) {
        // User logged in with Google
        return (
        
            <Tooltip title="My Profile" arrow className="custom-tooltip">
              <button className=" profileBtn" onClick={profileBtn}>
                {firstLetter}
              </button>
            </Tooltip>
         
        );
      } else {
        // User logged in with your application's credentials
        return (
           <Tooltip title="My Profile" arrow className="custom-tooltip">
              <Button className=" profileBtn" onClick={profileBtn}>
                {firstLetter}
              </Button>
           </Tooltip>
         
        );
      }
    } else {
      // User is not logged in
      return (
        <Nav className='buttonsFlex w-100'>
        <div className="d-flex flex-sm-column flex-lg-row align-items-center w-100"> {/* Use a flex column */}
            <Button className=" loginBtn" onClick={handleLoginClick}>
              Login
            </Button>
            <button className="signupBtn" onClick={handleSignUpClick}>
              Sign Up
            </button>                    
        </div>
      </Nav>
      );
    }
  };

  const showHeader = !(location.pathname === '/login' || location.pathname === '/signUp');

  return (
    <>
     
       
        {showHeader && (
          <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="navBar" sticky='top'>
            <Container>
              <Link to="/">
                <Navbar.Brand>
                  <img src="/images/logo.png" alt="Logo" height="50" className="d-inline-block align-top"  loading="lazy" />
                </Navbar.Brand>
              </Link>
              {token ? (
                <>
               
                  <Nav className="d-lg-none d-block profileNav" >{renderAuthButtons()}</Nav>
                            
                  <Navbar.Toggle aria-controls="responsive-navbar-nav"  class="navbar-toggler"  />
             
                  <Navbar.Collapse id="responsive-navbar-nav" >
                  <Nav className="me-auto">
                  <div className="nav-row ">
                    <NavLink to="/hotel" className="nav-link" activeClassName="active">
                      Hotel
                    </NavLink>
                    <NavLink to="/flight" className="nav-link" activeClassName="active">
                      Flight
                    </NavLink>
                  </div>
                  <div className="nav-row">
                    <NavLink to="/about" className="nav-link" activeClassName="active">
                      About
                    </NavLink>
                    <NavLink to="/offers" className="nav-link" activeClassName="active">
                      Offers
                    </NavLink>
                  </div>
                </Nav>
               
                     {/* Display profile button first on small screens (mobile) */}
                   <Nav className="d-lg-block d-none ml-auto">{renderAuthButtons()}</Nav>
                  
                  </Navbar.Collapse>
                 
                </>
              ) : (
                <>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                  <div className="nav-row">
                    <NavLink to="/hotel" className="nav-link" activeClassName="active">
                      Hotel
                    </NavLink>
                    <NavLink to="/flight" className="nav-link" activeClassName="active">
                      Flight
                    </NavLink>
                  </div>
                  <div className="nav-row">
                    <NavLink to="/about" className="nav-link" activeClassName="active">
                      About
                    </NavLink>
                    <NavLink to="/offers" className="nav-link" activeClassName="active">
                      Offers
                    </NavLink>
                  </div>
                </Nav>
                  
                      <Nav>{renderAuthButtons()}</Nav>
                   
                  </Navbar.Collapse>
                </>
              )}
            </Container>
          </Navbar>
        )}
      <hr className="hrLine" />
    </>
  );
}

export default Header;
