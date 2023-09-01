import React, { useState, useEffect } from "react";
import { formatDate, formatTime } from "../../utils/utils";
import "./GarageSaleDetails.css";
import AddItemForm from "../AddItemForm/AddItemForm";
import api from "../../utils/api";

const GarageSaleDetails = ({ garageSaleDetails }) => {
  const [garageSaleData, setGarageSaleData] = useState(null);

  useEffect(() => {
    fetchGarageSale();
  }, []);

  const fetchGarageSale = async () => {
    try {
      const response = await api.get(`/garage_sales/${garageSaleDetails.id}`);
      const garageSaleData = response.data;
      setGarageSaleData(garageSaleData);
    } catch (error) {
      console.error("Error getting garage sale details", error);
    }
  };
  

  return (
    <div className="sale-details-container">
      <div className="container">
        <p className="sale-format sale-name-font">{garageSaleDetails.name}</p>
        <div className="details-font">
          <p>Date of Sale: {formatDate(garageSaleDetails.date)}</p>
          <p>
            Time of Sale: {formatTime(garageSaleDetails.start_time)}-
            {formatTime(garageSaleDetails.end_time)}
          </p>
          <p>Address:</p>
          <div>
            <p>{garageSaleDetails.street_address}</p>
            <p>
              {garageSaleDetails.city}, {garageSaleDetails.state}{" "}
              {garageSaleDetails.zip}
            </p>
          </div>
        </div>
        <br />
      </div>
    </div>
    
  );
};

export default GarageSaleDetails;


