import React from "react";
import { formatDate, formatTime} from "../../utils/utils"
import './GarageSaleDetails.css'


const GarageSaleDetails = ({ garageSaleDetails }) => {

  return (
    <div className="sale-details-container">
      <div className="container">
        <p className="sale-format color">{garageSaleDetails.name}</p>
        <p>Date of Sale: {formatDate(garageSaleDetails.date)}</p>
        <p>
          Time of Sale: {formatTime(garageSaleDetails.start_time)}-
          {formatTime(garageSaleDetails.end_time)}
        </p>
        <p>Address:</p>
        <div>
          <p>{garageSaleDetails.street_address}</p>
          <p>
            {garageSaleDetails.city},{garageSaleDetails.state}{" "}
            {garageSaleDetails.zip}
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default GarageSaleDetails;
