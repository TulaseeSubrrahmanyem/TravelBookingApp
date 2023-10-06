import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import {  useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import Pagination from '../Pagination/pagination';
import { store } from '../App';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const MyDashboard = () => {
  const navigate=useNavigate();
  const [token, setToken] = useContext(store);
  const [isDashboardOpen, setDashboardOpen] = useState(true);
  const [isBookingsOpen, setBookingsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentRange, setCurrentRange] = useState({ start: 0, end: 0 });
  const [canceledBookingCount, setCanceledBookingCount] = useState(0);

 // Define the user data state.
 const [user, setUser] = useState({
  username: '',
  email: '',
  phoneNumber: '',
  address: '',
  city: '',
  state: '',
  country: '',
});

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

  const userName = token ? decodeToken(token)?.user?.name : null;

  const fetchData = async (page = 1) => {
    try {
      if (!token) {
        return;
      }

      const decodedToken = decodeToken(token);

      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        const userEmail = decodedToken.user.email;
        const response = await fetch(`http://localhost:8080/api/roombookings/user?page=${page}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData);
        console.log("bookedData",data)
        setTotalItems(responseData.bookings.length);
        setTotalPages(Math.ceil(responseData.bookings.length / itemsPerPage));
        console.log("setTotalPages",totalPages)
        setIsLoading(false);
      } else {
        Cookies.remove('jwtToken');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, itemsPerPage]);

  const handleDashboardClick = () => {
    setDashboardOpen(true);
    setBookingsOpen(false);
    setProfileOpen(false);
    setLogout(false);
    setActiveItem('dashboard');
    fetchData();
  };

  const handleBookingsClick = () => {
    setDashboardOpen(false);
    setBookingsOpen(true);
    setProfileOpen(false);
    setLogout(false);
    setActiveItem('bookings');
    fetchData();
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      console.log("Cancelling booking for ID:", bookingId);
  
      const bookingToCancel = data.bookings.find((booking) => booking._id === bookingId);
  
      if (!bookingToCancel) {
        throw new Error('Booking not found');
      }
  
      const checkoutDate = new Date(bookingToCancel.checkOutDate);
      const currentDate = new Date();
  
      if (checkoutDate > currentDate) {
        // Allow cancellation only if the checkout date is in the future
        const response = await fetch(`http://localhost:8080/api/roombookings/${bookingId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        console.log("Response from cancellation API:", response);
  
        if (!response.ok) {
          throw new Error('Failed to cancel booking');
        }
  
        // Remove the canceled booking from the data
        const updatedBookings = data.bookings.filter((booking) => booking._id !== bookingId);
        setData((prevData) => ({
          ...prevData,
          bookings: updatedBookings,
        }));
  
        // Increment the canceled booking count
        setCanceledBookingCount((prevCount) => prevCount + 1);
  
        // Update the total items and total pages after canceling
        setTotalItems((prevTotalItems) => prevTotalItems - 1);
        setTotalPages((prevTotalItems)=>Math.ceil((prevTotalItems - 1) / itemsPerPage));
        console.log("Cancelled booking count:", canceledBookingCount);
  
        // Update the canceled booking count in localStorage
        localStorage.setItem('canceledBookingCount', String(canceledBookingCount + 1));
  
        toast.success('Booking canceled successfully', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Notify the user that they can't cancel this booking
        toast.error('You cannot cancel this booking as the checkout date is in the past or today.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("Total items after cancellation:", totalItems);
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      toast.error('Failed to cancel booking', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  
  // Load the canceled booking count from localStorage on component mount
  useEffect(() => {
    const storedCanceledBookingCount = localStorage.getItem('canceledBookingCount');
    if (storedCanceledBookingCount) {
      setCanceledBookingCount(Number(storedCanceledBookingCount));
    }
  }, []);

  // Fetch user profile data
  const fetchProfileData = async () => {
    try {
      if (!token) {
        return;
      }

      const decodedToken = decodeToken(token);

      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        const userEmail = decodedToken.user.email;
        const response = await fetch('http://localhost:8080/api/users/myprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profileDataFromServer = await response.json();
        setUser(profileDataFromServer);
        console.log("userData",user)
      } else {
        Cookies.remove('jwtToken');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Fetch profile data when the component mounts
  // useEffect(() => {
  //   fetchProfileData();
  // }, [token]);

  // Function to handle profile form submit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
  
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          // Send a request to your server to update user profile data
          const userId = decodedToken.user.id; // Get the user ID from the decoded token
          console.log("Id", userId);

          // Include the email field in the user object
          const updatedUserObject = {
            username: user.username,
            email: user.email, // Include the email field
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            state: user.state,
            country: user.country,
          };

          const response = await fetch(`http://localhost:8080/api/users/usersUpdate/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUserObject), // Use the updated user object
          });
  
          if (!response.ok) {
            throw new Error('Failed to update profile data');
          }
  
          const updatedProfileData = await response.json();
          setUser(updatedProfileData);
          console.log(user)
          // Show a success message to the user
          toast.success('Profile updated successfully', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          Cookies.remove('jwtToken');
        }
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
      // Show an error message to the user
      toast.error('Failed to update profile data', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the user state with the changed form field
    setUser({
      ...user,
      [name]: value,
    });
  };
  
  {/*log out */}
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    localStorage.removeItem('jwtToken');
    setToken(null);
    navigate('/');
  };
  
  return (
    <div className='myProfile d-sm-flex d-sm-column d-md-flex flex-md-row justify-content-md-start '>
    <div className='d-flex flex-column mt-3'>
    <div>
    <div className='userCard '>
        <AccountCircleIcon style={{ color: 'lightgray', fontSize: '50px', marginTop: '30px' }} />
        <h3 className='userName'>{userName}</h3>
        <p style={{ fontSize: '15px' }}>Welcome Back</p>
    </div>
   
     <div className='optionBar d-flex flex-column justify-content-evenly'>
     <div
       className={`d-flex flex-row ${activeItem === 'dashboard' ? 'active-item' : ''}`}
       onClick={handleDashboardClick}
     >
       <DashboardCustomizeOutlinedIcon
         style={{ fontSize: '20px', margin: '5px' }}
         className='dashboardIcon'
       />
       <h1 className='dashboard'>Dashboard</h1>
     </div>
     <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
     <div
       className={`d-flex flex-row ${activeItem === 'bookings' ? 'active-item' : ''}`}
       onClick={handleBookingsClick}
     >
       <BookmarkAddedOutlinedIcon
         style={{ fontSize: '20px', margin: '5px' }}
         className='bookingsIcon'
       />
       <h1 className='bookings'>My Bookings</h1>
     </div>
     <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
     <div
      className={`d-flex flex-row ${activeItem === 'profile' ? 'active-item' : ''}`}
      onClick={() => {
        setDashboardOpen(false);
        setBookingsOpen(false);
        setProfileOpen(!isProfileOpen);
        setLogout(false);
        setActiveItem('profile');
        fetchProfileData();
        console.log("MyProfile Active")
      }}
     >
       <AccountCircleOutlinedIcon
         style={{ fontSize: '20px', margin: '5px' }}
         className='profileIcon'
       />
       <h1 className='profile'>My Profile</h1>
     </div>
     <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
     <div
       className={`d-flex flex-row ${activeItem === 'logout' ? 'active-item' : ''}`}
       onClick={() => {
         setDashboardOpen(false);
         setBookingsOpen(false);
         setProfileOpen(false);
         setLogout(!isLogout);
         setActiveItem('logout');
         handleLogout()
       }}
     >
       <LogoutOutlinedIcon style={{ fontSize: '20px', margin: '5px' }} />
       <h1 className='logout' >Logout</h1>
     </div>
   </div>
     </div>    
      </div>
      <div className='col-md-9'>
      {/* dashboard*/}
        <div className={`w-100 ${isDashboardOpen ? 'dashboardCard' : ''}`}>
        {isDashboardOpen && (
          <div className='d-sm-flex d-sm-column d-md-flex flex-md-row'>
          <div className='noOfCount '>
            <LocalMallOutlinedIcon style={{ fontSize: '50px', margin: '5px', color: "rgb(65, 64, 64)" }} />
            <h6>Total Bookings</h6>
            <p>{data.bookingCount}</p>
          </div>
          <div className='noOfCount'>
          <EventBusyOutlinedIcon style={{ fontSize: '50px', margin: '5px', color: "rgb(65, 64, 64)" }} />
          <h6>Total cancelled</h6>
          <p>{canceledBookingCount}</p>
        </div>
        </div>
        )}
        </div>
        {/*booking details */}
        <div className={`w-100 ${isBookingsOpen ? 'bookingsCard' : ''}`}>
        {isBookingsOpen && (
          <div>
            <div>
              <h2>Bookings</h2>
              <hr />
            </div>
            <div className='d-md-flex flex-md-row justify-content-md-between'>
              <label htmlFor="itemsPerPage">
                Show
                <select id="itemsPerPage" onChange={handleItemsPerPageChange} value={itemsPerPage} style={{ margin: "4px" }}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
                entries
              </label>
              <div>
                <label htmlFor='searchBox'>Search:</label>
                <input
                  type='search'
                  id="searchBox"
                  placeholder='Search hotels...'
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
            {data.bookings && data.bookings.length === 0 ?(
              <p>There are no bookings to display.</p>
            ): (
              <div>
                <table className="tableDataBooking mt-4">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Hotel Name</th>
                      <th>Payment</th>
                      <th>Check-in Date</th>
                      <th>Check-out Date</th>
                      <th style={{width:'80px'}}>Price</th>
                      <th>City</th>
                      <th>Cancel Option</th>
                    </tr>
                  </thead>
                  {!searchQuery && (
                  <tbody>
                    {data.bookings
                      // .filter((booking) =>
                      //   booking.hotelName.toLowerCase().includes(searchQuery.toLowerCase())

                      // )
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((booking, index) => (
                        <tr key={index}>
                          <td>{booking._id}</td>
                          <td>{booking.hotelName}</td>
                          <td>{booking.paymentOption}</td>
                          <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                          <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                          <td>₹ {booking.roomPrice}</td>
                          <td>{booking.hotelCity}</td>
                          <td>
                            <button onClick={() => handleCancelBooking(booking._id) } className='cancelBtn'>Cancel</button>
                          </td>
                        </tr>
                      ))}
                      
                  </tbody>
                      )}
                  {searchQuery && (
                    <tbody>
                      {data.bookings
                        .filter((booking) =>
                          booking.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.hotelCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.paymentOption.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((booking, index) => (
                          <tr key={index}>
                            <td>{booking._id}</td>
                            <td>{booking.hotelName}</td>
                            <td>{booking.paymentOption}</td>
                            <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                            <td>₹ {booking.roomPrice}</td>
                            <td>{booking.hotelCity}</td>
                            <td>
                              <button onClick={() => handleCancelBooking(booking._id)}  className='cancelBtn'>Cancel</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                  
                </table>
                <div className='d-flex flex-row justify-content-between mt-5'>
                  <p>
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
                  </p>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalItems / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
        </div>
        {/*userProfile update */}
        <div className={`w-100 ${isProfileOpen ? 'bookingsCard' : ''}`}>
        {isProfileOpen && (
          <>
            <h1 className='profileHead'>My Profile</h1>
            <form className='profileForm' onSubmit={handleProfileSubmit}>
            <div className='d-md-flex flex-md-row justify-content-md-between'>
              <div className='m-2 w-100 mr-2'>
                <label htmlFor='username' className='inputLabel'>
                  Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  name='username'
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
          
              <div className='m-2 w-100'>
                <label htmlFor='email' className='inputLabel'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control '
                  id='email'
                  name='email'
                  value={user.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          
            <div className='d-md-flex flex-md-row'>
              <div className='m-2 w-100 phoneNumber'>
                <label htmlFor='phoneNumber' className='inputLabel'>
                  Phone Number
                </label>
                <PhoneInput
                  className='form-control'
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  value={user.phoneNumber}
                  onChange={(value) => {
                    if (/^\d{0,10}$/.test(value)) {
                      setUser({ ...user, phoneNumber: value });
                    }
                  }}
                />
              </div>
          
              <div className='m-2 w-100'>
                <label htmlFor='country' className='inputLabel'>
                  Country
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='country'
                  name='country'
                  value={user.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          
            <div className='d-flex flex-row'>
              <div className='m-2 w-100'>
                <label htmlFor='state' className='inputLabel'>
                  State
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='state'
                  name='state'
                  value={user.state}
                  onChange={handleChange}
                />
              </div>
          
              <div className='m-2 w-100'>
                <label htmlFor='city' className='inputLabel'>
                  City
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='city'
                  name='city'
                  value={user.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          
            <div className='m-2'>
              <label htmlFor='address' className='inputLabel'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='address'
                name='address'
                value={user.address}
                onChange={handleChange}
              />
            </div>
          
            <button type='submit' className='UptadeBtn'>
              Update Profile
            </button>
          </form>
          
          </>
        )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyDashboard;
