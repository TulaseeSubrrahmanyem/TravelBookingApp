import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Loader } from '@googlemaps/js-api-loader';

const SimpleMap = ({ latitudes, longitudes }) => {
  // Replace with your API key
  const apiKey = 'AIzaSyCa3B13hxCZb8TsnzpIR5Rb1bz4uh3pzp8';

  const center = {
    lat: parseInt(latitudes[0]),
    lng: parseInt(longitudes[0]),
  };
  const zoom = 14;

  const markers = latitudes.map((lat, index) => ({
    key: index,
    lat: parseInt(lat),
    lng: parseInt(longitudes[index]),
    text: `Marker ${index + 1}`,
  }));

  const loader = new Loader({
    apiKey: apiKey,
    version: 'weekly', // Use a specific version if needed
  });

  useEffect(() => {
    loader.load().then(() => {
      // Google Maps API is loaded, you can proceed with rendering the map
    });
  }, []);

  const Marker = ({ text }) => {
    return (
      <div className="marker">
        {text}
      </div>
    );
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            lat={marker.lat}
            lng={marker.lng}
            text={marker.text}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
