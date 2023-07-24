import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime} from "../../utils/utils"
import './MySalesPage.css'
import api from '../../utils/api';

const MySalesPage = () => {
  const [user, token] = useAuth();
  const [mySales, setMySales] = useState([]);
  const navigate = useNavigate();

  const fetchMySales = async () => {
    try {
      const response = await api.get('/garage_sales', {
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
      const response = await api.delete(
        `/garage_sales/${garageSaleId}`,
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
    <div className=' color page-container'>
      <p className='color'>{user.first_name}'s Sale Summary</p>
      <div className='garage-sales-list container'>
        {mySales && mySales.length > 0 ? (
          mySales.map((garage_sale, index) => {
            if (user.id === garage_sale.user.id) {
              return (
                <div  key={index} className='card-link'>
                  <div  className=' mysales-size' onClick={() => navigate(`/garage_sales/${garage_sale.id}`)}>
                    <p className='mysales-name-format'>{garage_sale.name}</p>
                    <p className='mysales-details-format'>{formatDate(garage_sale.date)}</p>
                    <p className='mysales-details-format'>{formatTime(garage_sale.start_time)}-{formatTime(garage_sale.end_time)}</p>
                    <p className='mysales-details-format'>{garage_sale.street_address}</p>
                    <p className='mysales-details-format'>{garage_sale.city}, {garage_sale.state} {garage_sale.zip} </p>
                  </div>
                  <div>
                    <button className="btn btn-light btn-outline-dark btn-sm" type="submit" onClick={() => deleteSale(garage_sale.id)}>Delete Sale</button>
                    <button className="btn btn-light btn-outline-dark btn-sm" type="submit" onClick={() => handleEditSale(garage_sale)}>Edit Sale</button>
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