import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AddItemForm = ({ garageSale, fetchGarageSale }) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_of_item: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  async function addItem() {
    try {
        let response = await api.post(`/user_items/${garageSale.id}`,
      {
        name_of_item: formData.name_of_item,
        description: formData.description,
        price: formData.price,
        category: formData.category,
      
      }, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
  
        },
      });
      if (response.status === 201) {
        console.log('Line 49 AddItemForm', garageSale.id)
        await fetchGarageSale();
      }  
    } catch (error) {
      if (error.response && error.response.data) {
        console.log('Error response data:', error.response.data);
      } else {
        console.log('Error:', error);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItem();
  }

  function handleInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
  if (!user) {
   
    return null;
  }

  return garageSale.user.id === user.id && (
    <form   className = 'add-item-form' onSubmit={handleSubmit}>
      <div>
      <label>
        Item Name: <input className='add-item-name-input' type="text" name="name_of_item" value={formData.name_of_item} onChange={handleInputChange} />
      </label>
      </div>
      <div className='form-group'>
        <label>
          Description: <input className='add-item-desc-input' type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
      </div>
      <label>
        Price: <input className='add-item-price' type="number" name="price" value={formData.price} onChange={handleInputChange} />
      </label>
      <label className='pad-category'>
        Category:
        <select  name="category" value={formData.category} onChange={handleInputChange}>
          <option value="">Select a category</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>

        </select>
      </label>
      <div>
        <button className = 'btn btn-light' type="submit">Add Item</button>
      </div>
      
  
    </form>
  );
};

export default AddItemForm;