import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { ContextProvider } from './components/context'; // Correct import statement for ContextProvider
import HotelSearchBox from './components/hotelSearchBox'; // Correct import statement for HotelSearchBox

function App() {
  Modal.setAppElement('#root');

  return (
    <div className="App">
     
      <Router>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flight" element={<Flight />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/hotel/hotelsList" element={<HotelListPage />} />
            <Route path="/hotel/roomdetails" element={<HotelRoomDetails />} />
            <Route path="/room/booking" element={<RoomBooking />} />
            <Route path="/about" element={<About />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
       
      </Router>
    </div>
  );
}

export default App;
