import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const HomePage = () => {
  const [garageSales, setGarageSales] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchGarageSales = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/garage_sales/all");
        const updatedGarageSales = response.data.map((garage_sale) => {
          const date = new Date(garage_sale.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          });

          const startTimeParts = garage_sale.start_time.split(":");
          const startTime = new Date();
          startTime.setHours(parseInt(startTimeParts[0]));
          startTime.setMinutes(parseInt(startTimeParts[1]));

          const endTimeParts = garage_sale.end_time.split(":");
          const endTime = new Date();
          endTime.setHours(parseInt(endTimeParts[0]));
          endTime.setMinutes(parseInt(endTimeParts[1]));

          const formattedStartTime = startTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          });
          const formattedEndTime = endTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          });

          return {
            ...garage_sale,
            formattedDate: formattedDate,
            formattedStartTime: formattedStartTime,
            formattedEndTime: formattedEndTime,
          };
        });

        setGarageSales(updatedGarageSales);
      } catch (error) {
        console.error("Error fetching garage sales:", error);
      }
    };

    fetchGarageSales();
  }, []);

  const filteredGarageSales = garageSales.filter((garage_sale) => {
    return (
      garage_sale.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      garage_sale.formattedDate.includes(searchInput) ||
      garage_sale.formattedStartTime.includes(searchInput) ||
      garage_sale.formattedEndTime.includes(searchInput) ||
      garage_sale.zip.toString().includes(searchInput)
    );
  });


  return (
    <div className="container">
      <h1>Active Garage Sales</h1>
      <div>
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>
      {filteredGarageSales &&
        filteredGarageSales.map((garage_sale) => (
          <Link to={`/garage_sales/${garage_sale.id}`} key={garage_sale.id}>
            <span>
              <p>{garage_sale.name}</p>
              <p>{garage_sale.formattedDate}</p>
              <p>
                {garage_sale.formattedStartTime}-{garage_sale.formattedEndTime}
              </p>
              <p>{garage_sale.zip}</p>
              <p>{garage_sale.categories}</p>
              <br />
            </span>
          </Link>
        ))}
    </div>
  );
};

export default HomePage;