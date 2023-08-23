import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import './AllGarageSaleMap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllGarageSaleMap = ({ filteredGarageSales }) => {
  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };
  const [userLocation, setUserLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const navigate = useNavigate();

  const defaultZoom = 10;
  const LocationMarker1 = ({ text }) => (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '50%', width: '40px', height: '40px' }}>
      {text}
    </div>
  );

  const LocationMarker2 = ({ text, onClick }) => (
    <div onClick={onClick} style={{ backgroundColor: 'purple', color: 'white', padding: '5px', borderRadius: '50%', width: '40px', height: '40px' }}>
      {text}
    </div>
  ); 

  useEffect(() => {
    setIsMounted(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  }, [isMounted]);

  const fetchCoordinates = async (address) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );

      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng, address };
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllCoordinates = async () => {
      const coordinatesArray = await Promise.all(
        filteredGarageSales.map(async (garageSale) => {
          const fullAddress = `${garageSale.street_address}, ${garageSale.city}, ${garageSale.state} ${garageSale.zip}`;
          return await fetchCoordinates(fullAddress);
        })
      );

      const validCoordinates = coordinatesArray.filter((coord) => coord !== null);
      setCoordinates(validCoordinates);
    };

    fetchAllCoordinates();
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
            <LocationMarker1 lat={userLocation.lat} lng={userLocation.lng} text="You are here" />
          )}
          {coordinates.map((coord, index) => (


            <LocationMarker2 key={index} lat={coord.lat} lng={coord.lng} onClick={() => navigate(`/garage_sales/${filteredGarageSales[index].id}`)}
            text={filteredGarageSales[index]?.name || "Unknown"} 
            />

          ))}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default AllGarageSaleMap;