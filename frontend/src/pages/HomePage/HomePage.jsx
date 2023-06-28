import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import './HomePage.css'


const HomePage = () => {
  const [garageSales, setGarageSales] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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
    <div className = "background-format color" >
      <div className='top-bar'>
        <h1>Active Garage Sales</h1>
        <div>
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>
      </div>
      <div className = "garage-sales-list container border">
      {filteredGarageSales &&
        filteredGarageSales.map((garage_sale) => (
          <div className = "card-link" key= {garage_sale.id} onClick = {() => navigate(`/garage_sales/${garage_sale.id}`)}>
            <div >

              <div className = "sale-format">{garage_sale.name}</div>
              <div className="sale-data-format">Date: <p>{garage_sale.formattedDate}</p></div>
              <div className="sale-data-format">Time:  
                <p>{garage_sale.formattedStartTime}-{garage_sale.formattedEndTime}</p>
              </div>
              <div className="sale-data-format">Zip:<p>{garage_sale.zip}</p></div>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default HomePage;