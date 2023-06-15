import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MySales = ({ user, mySales }) => {
  const navigate = useNavigate();
  const handleClick = (garageSaleId) => navigate(`/garage_sales/${garageSaleId}`);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const formatTime = (timeString) => {
    const timeParts = timeString.split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div>
      <h1>{user.username}'s Sale Summary</h1>
      <div>
        {mySales && mySales.length > 0 ? (
          mySales.map((garage_sale, index) => (
            <div key={index} onClick={() => handleClick(garage_sale.id)}>
              <p>{garage_sale.name}</p>
              <p>{formatDate(garage_sale.date)}</p>
              <p>{formatTime(garage_sale.start_time)}-{formatTime(garage_sale.end_time)}</p>
              <p>{garage_sale.street_address}</p>
              <p>{garage_sale.city}, {garage_sale.state} {garage_sale.zip}</p>
            </div>
          ))
        ) : (
          <p>No Sales Posted</p>
        )}
      </div>
    </div>
  );
};

export default MySales;