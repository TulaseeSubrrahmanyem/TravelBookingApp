import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Modal from 'react-modal'; // Import the react-modal library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './index.css'

// Set the correct path to the Leaflet images
 //L.Icon.Default.imagePath = '../node_modules/leaflet';

 // Delete the default _getIconUrl method to avoid conflicts
 delete L.Icon.Default.prototype._getIconUrl;

// Merge the default icon options with custom images
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//Define a custom red marker icon
// const redIcon = new L.Icon({
//   iconUrl: 'https://w7.pngwing.com/pngs/825/131/png-transparent-google-map-maker-google-maps-seo-angle-heart-map.png',
//   iconRetinaUrl: 'https://w7.pngwing.com/pngs/825/131/png-transparent-google-map-maker-google-maps-seo-angle-heart-map.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   shadowSize: [41, 41],
// });




function MapsMobalBox({ lat, lng,hotelName, hotelAddress  }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log("hotel name",hotelAddress,hotelName)
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
 const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }
  // const position = [28.63147, 77.20812];

  return (
    <div className='d-flex flex-row justify-content-center alignSelf-center'>
      <button className='showMap'  onClick={openModal}>Open Modal <FontAwesomeIcon icon={faAngleRight} style={{ marginTop: '5px',marginLeft:'5px' }} /></button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Map Modal"
        className='modalBox'
      >
        <MapContainer center={[lat, lng]} zoom={18} style={{ height: '400px',width:"750px",transform:'rotate(360)',transition:'transform 2s ease' }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} onMouseOver={togglePopup} onMouseOut={togglePopup}>
          
            <Popup>
              <div style={{margin:"0px",padding:"0px"}}>
                <p style={{fontSize:"12px",fontWeight:'600',textAlign:'center'}}>{hotelName}</p>
                <p style={{fontSize:"12px",textAlign:"center"}}>{hotelAddress}</p>
              </div>
            </Popup>
          
          </Marker>
        </MapContainer>
        {/*<button onClick={closeModal}>Close Modal</button>*/}
      </Modal>
    </div>
  );
}

export default MapsMobalBox;
