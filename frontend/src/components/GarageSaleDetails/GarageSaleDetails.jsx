import React from "react";
import axios from "axios";
import ItemList from "../ItemList/ItemList";
import GarageSaleMap from "../GarageSaleMap/GarageSaleMap";
import AddItemForm from "../AddItemForm/AddItemForm";
import { formatDate, formatTime } from "../MyFunctions/MyFunctions";

const GarageSaleDetails = ({ garageSaleDetails }) => {
  console.log(garageSaleDetails);

  return (
    <div>
      <h1>Details</h1>

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
        </div>
        <br />
        <AddItemForm garageSale={garageSaleDetails}/>
      </div>
    </div>
  );
};

export default GarageSaleDetails;
