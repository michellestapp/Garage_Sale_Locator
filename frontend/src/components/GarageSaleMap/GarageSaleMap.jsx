import React, { useState, useEffect } from 'react';
// import { GoogleMap, Marker, useLoadScript } from "react-google-maps";
// import { GoogleMap, Marker } from 'google-maps-react';
import GoogleMapReact from 'google-map-react'
import axios from 'axios';




const Marker = ({ text }) => <div>{text}</div>;

const GarageSaleMap = ({ fullAddress, markerText }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  console.log(coordinates)


  const fetchCoordinates = async () => {
    try {
      console.log(fullAddress) 

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
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyBT6E7N9TKiM3KZcDNW5NPvrxJSIsmDbpU'}} 
      center={coordinates} 

      defaultZoom={15}>
        <Marker lat={coordinates.lat} lng={coordinates.lng} text={markerText}/>
       

      </GoogleMapReact>
    </div>
  );
};


export default GarageSaleMap;