import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime} from "../../utils/utils"

const MySalesPage = () => {
  const [user, token] = useAuth();
  const [mySales, setMySales] = useState([]);
  const navigate = useNavigate();

  const fetchMySales = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/garage_sales', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setMySales(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteSale = async (garageSaleId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/garage_sales/${garageSaleId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (response.status === 204) {
        await fetchMySales();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchMySales();
  }, [user, token]);

  const handleEditSale = (garageSale) => {
   navigate(`/edit_sale/${garageSale.id}`, { state: { garage_sale: garageSale} });
 };

  return (
    <div>
      <h1>{user.username}'s Sale Summary</h1>
      <div>
        {mySales && mySales.length > 0 ? (
          mySales.map((garage_sale, index) => {
            if (user.id === garage_sale.user.id) {
              return (
                <div key={index}>
                  <div className = "current-sales" onClick={() => navigate(`/garage_sales/${garage_sale.id}`)}>
                    <p>{garage_sale.name}</p>
                    <p>{formatDate(garage_sale.date)}</p>
                    <p>{formatTime(garage_sale.start_time)}-{formatTime(garage_sale.end_time)}</p>
                    <p>{garage_sale.street_address}</p>
                    <p>{garage_sale.city}, {garage_sale.state} {garage_sale.zip} </p>
                  </div>
                  <div>
                    <button type="submit" onClick={() => deleteSale(garage_sale.id)}>Delete Sale</button>
                    <button type="submit" onClick={() => handleEditSale(garage_sale)}>Edit Sale</button>
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No Sales Posted</p>
        )}
      </div>
    </div>
  );
};

export default MySalesPage;