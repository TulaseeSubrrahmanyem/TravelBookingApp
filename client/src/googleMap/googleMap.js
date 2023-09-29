import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Loader } from '@googlemaps/js-api-loader';

const SimpleMap = ({ latitudes, longitudes }) => {
  // Replace with your Google Maps API key
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

  // Define the center of the map
  const center = {
    lat: parseFloat(latitudes[0]),
    lng: parseFloat(longitudes[0]),
  };

  // Set the initial zoom level
  const zoom = 14;

  // Create an array of markers based on provided latitudes and longitudes
  const markers = latitudes.map((lat, index) => ({
    key: index,
    lat: parseFloat(lat),
    lng: parseFloat(longitudes[index]),
    text: `Marker ${index + 1}`,
  }));

  // Create a Loader instance to load the Google Maps API
  const loader = new Loader({
    apiKey: apiKey,
    version: 'weekly', // Use a specific version if needed
  });

  // Use useEffect to load the Google Maps API when the component mounts
  useEffect(() => {
    loader.load().then(() => {
      // Google Maps API is loaded, you can proceed with rendering the map
    });
  }, [loader]);

  // Marker component for rendering individual markers
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
