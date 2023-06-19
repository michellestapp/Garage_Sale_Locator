import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditItemPage = () => {
    const location = useLocation();
    const {item, garageSaleId} = location.state;
    const [user, token] = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name_of_item: item ? item.name_of_item : '',
        description: item ? item.description : '',
        price: item ? item.price : '',
        category: item ? item.category : '',
        image: item ? item.image : null,
  });


  function handleSubmit(event) {
    event.preventDefault();
    editItem();
    navigate(`/garage_sales/${garageSaleId}`);

  }

  async function editItem() {
    try {
      let response = await axios.put(
        `http://127.0.0.1:5000/api/items/${item.id}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response && response.data) {
        console.log('editItem Function',response.data.garage_sale.id);
      } else {
        console.log('Response is undefined or does not have data property');
      }
    } catch (error) {
      console.log(error.response.data);
      
    }
  }

  function handleInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
    console.log('FormData:', formData);
  }

  function handleFileInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: event.target.files[0],
    }));
    console.log('FormData:', formData);
  }


    return ( 
        <div>
            <h1>Edit Item Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Item Name: 
                    <input type="text" name="name_of_item" value={formData.name_of_item} onChange={handleInputChange} />
                </label>
                <div>
                    <label>
                        Description: 
                        <input type="text" name="description" value={formData.description || ''} onChange={handleInputChange} />
                    </label>
                </div>
                <label>
                    Price: 
                    <input type="number" name="price" value={formData.price || ''} onChange={handleInputChange} />
                </label>
                <label>
                    Category: 
                    <input type="text" name="category" value={formData.category || ''} onChange={handleInputChange} />
                </label>
                <div>
                    <label>
                        Image: 
                        <input type="file" name="image" onChange={handleFileInputChange} />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
 
export default EditItemPage;