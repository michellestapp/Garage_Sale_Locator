import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'
import axios from 'axios';
import './GarageSaleMap.css'



const Marker = ({ text }) => (
  <div style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '50%', width: '40px', height: '40px' }}>
    {text}
  </div>
);

const GarageSaleMap = ({ fullAddress, markerText }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const fetchCoordinates = async () => {
    try {


      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=AIzaSyBT6E7N9TKiM3KZcDNW5NPvrxJSIsmDbpU`
      );

      const { lat, lng } = response.data.results[0].geometry.location;
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [fullAddress]);
   

  return (
    <div className='map-format'>
      <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyBT6E7N9TKiM3KZcDNW5NPvrxJSIsmDbpU'}} 
      center={coordinates} 

      defaultZoom={15}>
        <Marker lat={coordinates.lat} lng={coordinates.lng} text={markerText}/>
       

      </GoogleMapReact>
    </div>
  );
};


export default GarageSaleMap;