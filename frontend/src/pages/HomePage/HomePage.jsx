import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

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
          const startTimeParts = garage_sale.start_time.split(":");
          const startTime = new Date();
          startTime.setHours(parseInt(startTimeParts[0]));
          startTime.setMinutes(parseInt(startTimeParts[1]));
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const formattedStartTime = startTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: 'numeric' 
          });
          return {
            ...garage_sale,
            formattedDate: formattedDate,
            formattedStartTime: formattedStartTime
          };
        });

        setGarageSales(updatedGarageSales);
      } catch (error) {}
    };
    fetchGarageSales();
  },[]);
  return (
    <div className="container">
      <h1>Home Page!</h1>
      {garageSales &&
        garageSales.map((garage_sale) => (
          <p key={garage_sale.id}>
            {garage_sale.formattedDate} {garage_sale.formattedStartTime}-
            {garage_sale.end_time}
          </p>
        ))}
    </div>
  );
};

export default HomePage;

//   return (
//     <div>
//       <h1>Welcome to the Garage Sale Locator</h1>
//       <input type="time" />
//     </div>
//   );
// };

// export default HomePage;
