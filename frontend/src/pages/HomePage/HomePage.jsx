import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../utils/api"
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import './HomePage.css'
import { formatDate, formatTime } from "../../utils/utils";
import AllGarageSaleMap from "../../components/AllGarageSaleMap/AllGarageSaleMap";


const HomePage = () => {
  const [garageSales, setGarageSales] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGarageSales = async () => {
      try {
        let response = await api.get("/garage_sales/all");
        const GarageSaleData = response.data;
        setGarageSales(GarageSaleData);
      } catch (error) {
        console.error("Error fetching garage sales:", error);
      }
    };

    fetchGarageSales();
  }, []);

  const filteredGarageSales = garageSales.filter((garage_sale) => {
    return (
      garage_sale.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      formatDate(garage_sale.date).includes(searchInput) ||
      formatTime(garage_sale.start_time).includes(searchInput) ||
      formatDate(garage_sale.end_time).includes(searchInput) ||
      garage_sale.zip.toString().includes(searchInput)||
      garage_sale.items.some(item => item.category.toLowerCase().includes(searchInput.toLowerCase()))||
      garage_sale.items.some(item => item.name_of_item.toLowerCase().includes(searchInput.toLowerCase()))
    );
  });

  return (
    <div className="color page-container">
      <div className='top-bar'>
        <p className="outlined-text">Active Garage Sales</p>
        <div>
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>
      </div>
      <div className="garage-sale-map container">
        <AllGarageSaleMap filteredGarageSales={filteredGarageSales} />
      </div>
      <div className="garage-sales-list container">
        {filteredGarageSales &&
          filteredGarageSales.map((garage_sale) => {
            const uniqueCategories = [...new Set(garage_sale.items.map(item => item.category))];
            return (
              <div className="card-link" key={garage_sale.id} onClick={() => navigate(`/garage_sales/${garage_sale.id}`)}>
                <div>
                  <div className="sale-format">{garage_sale.name}</div>
                  <div className="sale-data-format">Date: <p>{formatDate(garage_sale.date)}</p></div>
                  <div className="sale-data-format">Time:
                    <p>{formatTime(garage_sale.start_time)}-{formatTime(garage_sale.end_time)}</p>
                  </div>
                  <div className="sale-data-format">Zip:<p>{garage_sale.zip}</p></div>
                  <p className="sale-data-format" key={garage_sale.id}>Categories: </p>
                  {uniqueCategories.map((category) => (
                    <div key={category}>
                    <p className="category-format  single-spacing">{category}</p>
                    {/* {garage_sale.items.map((item) => {
                      if (item.category === category) {
                        return <p className="item-cat-format  single-spacing" key={item.id}>{item.name_of_item}</p>;
                      }
                    })} */}
                  </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;