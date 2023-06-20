import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

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

      let response = await axios.put(
        `http://127.0.0.1:5000/api/edit_sale/${garageSale.id}`,
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
    <div className='background-format'>
      <form onSubmit={handleSubmit}>
        <label>
          Sale Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <div>
          <label>
            Date of Sale:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </label>
        </div>
        <label>
          Start time:
          <input type="time" name="start_time" value={formData.start_time} onChange={handleInputChange} />
        </label>
        <label>
          End time:
          <input type="time" name="end_time" value={formData.end_time} onChange={handleInputChange} />
        </label>
        <div>
          <label>
            Street Address:
            <input type="text" name="street_address" value={formData.street_address} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
          </label>
          <label>
            State:
            <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
          </label>
          <label>
            Zip:
            <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} />
          </label>
        </div>
        <br />
        <button className="btn btn-light btn-outline-dark btn-sm" type="submit">Submit Changes</button>
      </form>
      <br /><br />
    </div>
  );
};

export default EditSalePage;