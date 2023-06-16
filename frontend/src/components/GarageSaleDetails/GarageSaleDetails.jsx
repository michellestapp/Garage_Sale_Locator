import React from "react";
import axios from "axios";
import ItemList from "../ItemList/ItemList";
import GarageSaleMap from "../GarageSaleMap/GarageSaleMap";
import AddItemForm from "../AddItemForm/AddItemForm";

const GarageSaleDetails = ({ garageSaleDetails }) => {
  console.log(garageSaleDetails);


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

  const fullAddress = () => {
    return `${garageSaleDetails.street_address}, ${garageSaleDetails.city}, ${garageSaleDetails.state} ${garageSaleDetails.zip}`;
  };

  return (
    <div>
      <h1>Details</h1>
      <GarageSaleMap
        fullAddress={fullAddress()}
        markerText={garageSaleDetails.name}
      />

      <div>
        <p>Name: {garageSaleDetails.name}</p>
        <p>Date of Sale: {formatDate(garageSaleDetails.date)}</p>
        <p>
          Time of Sale: {formatTime(garageSaleDetails.start_time)}-
          {formatTime(garageSaleDetails.end_time)}
        </p>
        <p>Address:</p>
        <div>
          {garageSaleDetails.street_address}
          <p>
            {garageSaleDetails.city},{garageSaleDetails.state}{" "}
            {garageSaleDetails.zip}
          </p>
          <p>{fullAddress()}</p>
        </div>
        <br />
        <AddItemForm garageSale={garageSaleDetails}/>
        <ItemList items={garageSaleDetails.items} />
      </div>
    </div>
  );
};

export default GarageSaleDetails;
