import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";


const ItemList = ({ garageSaleDetails, garageSaleId, fetchGarageSale }) => {
  const navigate = useNavigate()
  const [user, token] = useAuth();

  const handleEditItem = (item) => {
    navigate(`/items/${item.id}`, { state: { item, garageSaleId: garageSaleId } });
  };


  const deleteItem = async (item) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/items/${item.id}`,{
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (response.status === 204) {
        await fetchGarageSale();
      }
    } catch (error) {
      console.log('Error:', error);
    } 
  }

  return (
    <div>
      {garageSaleDetails.items.map((item) => (
        <div key={item.id}>
          {item.image ? (
            <img
              src={`http://127.0.0.1:5000/images/${item.image}`}
              alt={item.name_of_item}
            />
          ) : (
            <span>No image available</span>
          )}
          <p>Item Name: {item.name_of_item}</p>
          <p>Item Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          <div>
            {(user.id == garageSaleDetails.user.id) ? (
            <button onClick={() => handleEditItem(item)}>Edit Item</button>
            )
          : ( " ")}
        </div>
        <div>
            { (user.id == garageSaleDetails.user.id)? (
            <button onClick={() => deleteItem(item)}>Delete Item</button>
            )
          : ( " ")}
        </div>

        </div>
      ))}
    </div>
  );
};

export default ItemList;
