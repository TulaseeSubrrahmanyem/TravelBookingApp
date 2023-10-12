import React, { useState, createContext,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Flight from './Flight';
import Home from './Home';
import Hotel from './Hotel';
import About from './About';
import NotFound from './NotFound';
import Header from './Header';
import Offers from './Offers';
import HotelListPage from './HotelListPage';
import HotelRoomDetails from './HotelRoomDetails';
import ErrorBoundary from './ErrorBoundary';
import Modal from 'react-modal';
import RoomBooking from './RoomBooking';
import { ContextProvider } from './components/context';
import HotelSearchBox from './components/hotelSearchBox';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MyDashboard from './MyDashboard';
import Footer from './FooterContent'
import Careers from './career';
import PrivacyPolicy from './PrivacyPolicy'
import HowToBook from './HowToBook';
import TermsOfUse from './TermsOfUse';
export const store = createContext();

function App() {
  Modal.setAppElement('#root');
  const [token, setToken] = useState(null);
 
  return (
    <div className="App">
      <store.Provider value={[token, setToken]}>
        <GoogleOAuthProvider>
          <Router>
          <div className='app-container'>
            <Header />
            <div className='contentElement'>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flight" element={<Flight />} />
                <Route path="/hotel" element={<Hotel />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/myDashboard" element={<MyDashboard/>} />
                <Route path="/hotel/hotelsList" element={<HotelListPage />} />
                <Route path="/hotel/roomdetails" element={<HotelRoomDetails />} />
                <Route path="/room/booking" element={<RoomBooking />} />
                <Route path="/about" element={<About />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/HowtoBook" element={<HowToBook />} />
                <Route path="/TermsOfUse" element={<TermsOfUse />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            </div>
            {/*<Footer/>*/}
            <Footer/>
         </div>
          </Router>
        </GoogleOAuthProvider>
      </store.Provider>
    </div>
  );
}

export default App;
