import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom'

import axios from "axios";

const HomePage = ({}) => {
  const [garageSales, setGarageSales] = useState([]);

  useEffect(() => {
    const fetchGarageSales = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:5000/api/garage_sales/all"
        );
        const updatedGarageSales = response.data.map((garage_sale) => {
          const date = new Date(garage_sale.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          });

          const startTimeParts = garage_sale.start_time.split(":");
          const startTime = new Date();
          startTime.setHours(parseInt(startTimeParts[0]));
          startTime.setMinutes(parseInt(startTimeParts[1]));

          const endTimeParts = garage_sale.end_time.split(":");
          const endTime = new Date();
          endTime.setHours(parseInt(endTimeParts[0]));
          endTime.setMinutes(parseInt(endTimeParts[1]));

          
          const formattedStartTime = startTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: 'numeric' 
          });
          const formattedEndTime = endTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: 'numeric' 
          });
          return {
            ...garage_sale,
            formattedDate: formattedDate,
            formattedStartTime: formattedStartTime,
            formattedEndTime: formattedEndTime
          };
        });

        setGarageSales(updatedGarageSales);
      } catch (error) {}
    };
    fetchGarageSales();
  },[]);
  return (
    <div className="container">
      <h1>Active Garage Sales</h1>
      {garageSales &&
        garageSales.map((garage_sale) => (
            <Link to={`/garage_sales/${garage_sale.id}`}  key={garage_sale.id} >
                <div >
                
                    <div> {garage_sale.name} </div>
                    <div>{garage_sale.formattedDate}</div> 
                    <div>{garage_sale.formattedStartTime}-
                    {garage_sale.formattedEndTime}</div>
                    <div> {garage_sale.zip} </div>
                    <div>{garage_sale.categories}</div>
                
                </div>
            </Link>
        ))}
    </div>
  );
};

export default HomePage;


