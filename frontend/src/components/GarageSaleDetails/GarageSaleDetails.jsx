import React from "react";
import { formatDate, formatTime} from "../../utils/utils"

const GarageSaleDetails = ({ garageSaleDetails }) => {

  return (
    <div>
      <div>
        <p className="sale-format">{garageSaleDetails.name}</p>
        <p><h5>Date of Sale:</h5> {formatDate(garageSaleDetails.date)}</p>
        <p>
          <h5>Time of Sale:</h5> {formatTime(garageSaleDetails.start_time)}-
          {formatTime(garageSaleDetails.end_time)}
        </p>
        <p><h5>Address:</h5></p>
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
