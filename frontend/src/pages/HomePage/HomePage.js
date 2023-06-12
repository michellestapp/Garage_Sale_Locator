import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const[garageSales, setGarageSales] = useState([]);



  useEffect(() => {
    const fetchGarageSales = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/garage_sales", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const updatedGarageSales = response.data.map((garage_sale) => {
          const date = new Date(garage_sale.date);
          // const startTime = new Date(garage_sale.start_time)
          // console.log(startTime)

          const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          // const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
          return {...garage_sale,
            formattedDate: formattedDate,
            // formattedStartTime: formattedStartTime
          };
        });

        setGarageSales(updatedGarageSales);
      } catch (error) {


      }
    };
    fetchGarageSales();
  }, [token]);
  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.username}!</h1>
      {garageSales &&
        garageSales.map((garage_sale) => (
          <p key={garage_sale.id}>
            {garage_sale.formattedDate} {garage_sale.start_time}-{garage_sale.end_time}
            {/* {car.year} {car.model} {car.make} */}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
