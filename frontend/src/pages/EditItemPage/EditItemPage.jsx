import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditItemPage = ({}) => {
    const [user,token] = useAuth();
    const location = useLocation()

    const [formData, setFormData] = useState({
        name_of_item: item.name_of_item,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image        
      });

      const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: event.target.value
        }));
      };
      
      async function editItem() {
        try {
    
          let response = await axios.put(
            `http://127.0.0.1:5000/api/item/${item.id}`,
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
      
    return ( <div>Edit Item  Page</div> );
}
 
export default EditItemPage;