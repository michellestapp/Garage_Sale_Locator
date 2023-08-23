import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './EditSaleForm.css';


const EditSaleForm = ({ garageSaleId, token, fetchMySales }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    street_address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await api.put(
        `/garage_sales/${garageSaleId}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      fetchMySales(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchMySales();
  }, [token]);

  return (
    <div className='center-form-edit-sale test'>
      <form  onSubmit={handleSubmit}>
        <label>
          Sale Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <div>
          <label className='test'>
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
        <button type="submit">Edit Sale</button>
      </form>
    </div>
  );
};

export default EditSaleForm;