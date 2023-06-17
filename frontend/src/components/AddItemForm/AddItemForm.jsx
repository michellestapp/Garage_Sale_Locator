import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItemForm = ({ garageSale , onItemAdded}) => {
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
      const form = new FormData();
      form.append('name_of_item', formData.name_of_item);
      form.append('description', formData.description);
      form.append('price', formData.price);
      form.append('category', formData.category);
      form.append('image', formData.image);

      let response = await axios.post('http://127.0.0.1:5000/api/user_items/3', form, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
 
        if (typeof onItemAdded === 'function') {
        onItemAdded();}
   
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
    navigate(`/garage_sales/${garageSale.id}`);

  }

  function handleInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFileInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: event.target.files[0],
    }));
  }

  return garageSale.user.id === user.id && (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name: <input type="text" name="name_of_item" value={formData.name_of_item} onChange={handleInputChange} />
      </label>
      <div>
        <label>
          Description: <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
      </div>
      <label>
        Price: <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
      </label>
      <label>
        Category: <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
      </label>
      <div>
        <label>
          Image: <input type="file" name="image" onChange={handleFileInputChange} />
        </label>
      </div>

      <button type="submit">Add Item</button>
      <h1>test</h1>
    </form>
  );
};

export default AddItemForm;