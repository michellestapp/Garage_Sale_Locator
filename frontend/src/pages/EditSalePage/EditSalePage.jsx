import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import api from '../../utils/api';
import './EditSalePage.css'


const EditSalePage = ({}) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const garageSale = location.state?.garage_sale
  
  const [formData, setFormData] = useState({
    name: garageSale.name,
    date: garageSale.date,
    start_time: garageSale.start_time,
    end_time: garageSale.end_time,
    street_address: garageSale.street_address,
    city: garageSale.city,
    state: garageSale.state,
    zip: garageSale.zip
  });

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

async function editSale() {
    try {

      let response = await api.put(
        `/edit_sale/${garageSale.id}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    editSale();
    navigate('/mySalesPage');
    
  }
 

  return (
    <div className='edit-sale-page-container'>
      <div className='edit-sale-form-format'>
      <form onSubmit={handleSubmit}>
        <label>
          Sale Name:
          <input className='edit-sale-field' type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <div>
          <label>
            Date of Sale:
            <input className='edit-sale-field' type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </label>
        </div>
        <label>
          Start time:
          <input  className='edit-sale-field' type="time" name="start_time" value={formData.start_time} onChange={handleInputChange} />
        </label>
        <label>
          End time:
          <input className='edit-sale-field' type="time" name="end_time" value={formData.end_time} onChange={handleInputChange} />
        </label>
        <div>
          <label>
            Street Address:
            <input className='edit-sale-field' type="text" name="street_address" value={formData.street_address} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            City:
            <input className='edit-sale-field' type="text" name="city" value={formData.city} onChange={handleInputChange} />
          </label>
          <label>
            State:
            <input className='edit-sale-field' type="text" name="state" value={formData.state} onChange={handleInputChange} />
          </label>
          <label>
            Zip:
            <input className='edit-sale-field' type="text" name="zip" value={formData.zip} onChange={handleInputChange} />
          </label>
        </div>
        <br />
        <button className=" btn btn-light btn-outline-dark btn-sm" type="submit">Submit Changes</button>
      </form>
      </div>
      <br /><br />
    </div>
  );
};

export default EditSalePage;