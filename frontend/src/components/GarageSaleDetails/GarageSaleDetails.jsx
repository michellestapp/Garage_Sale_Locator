import React from "react";
import { formatDate, formatTime} from "../../utils/utils"

const GarageSaleDetails = ({ garageSaleDetails }) => {

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
      </div>
    </div>
  );
};

export default GarageSaleDetails;
