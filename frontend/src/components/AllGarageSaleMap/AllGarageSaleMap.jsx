import React from "react";
import GoogleMapReact from "google-map-react";
import './AllGarageSaleMap.css'

const LocationMarker = ({ text }) =>  
 <div style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '50%', width: '40px', height: '40px' }}>
  {text}
  </div>;

const AllGarageSaleMap = () => {
  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };

  const defaultZoom = 10;
  

  const locations = [
    { id: 1, name: "Location 1", lat: 40.712776, lng: -74.005974 },
    { id: 2, name: "Location 2", lat: 37.774929, lng: -122.419418 },
    // Add more locations as needed
  ];

  return (
    <div className="large-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      >
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            lat={location.lat}
            lng={location.lng}
            text={location.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default AllGarageSaleMap;