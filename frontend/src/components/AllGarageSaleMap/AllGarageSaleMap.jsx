import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import './AllGarageSaleMap.css';
import axios from "axios";

const LocationMarker = ({ text }) => (
  <div style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '50%', width: '40px', height: '40px' }}>
    {text}
  </div>
);

const AllGarageSaleMap = ({ filteredGarageSales }) => {
  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };
  const [userLocation, setUserLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const defaultZoom = 10;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  }, []);

  const fetchCoordinates = async (address) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );

      const { lat, lng } = response.data.results[0].geometry.location;
      setCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        { lat, lng, address },
      ]);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  useEffect(() => {
    filteredGarageSales.forEach((garageSale) => {
      const fullAddress = `${garageSale.street_address}, ${garageSale.city}, ${garageSale.state} ${garageSale.zip}`;
      console.log(filteredGarageSales.name)
      fetchCoordinates(fullAddress);
    });
  }, [filteredGarageSales]);

  const center = userLocation;

  return (
    <div className="large-map">
      {center && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={center}
          defaultZoom={defaultZoom}
        >
          {userLocation && (
            <LocationMarker lat={userLocation.lat} lng={userLocation.lng} text="You are here" />
          )}
          {coordinates.map((coord, index) => (
            <LocationMarker
              key={index}
              lat={coord.lat}
              lng={coord.lng}
              text={filteredGarageSales.name}
            />
          ))}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default AllGarageSaleMap;