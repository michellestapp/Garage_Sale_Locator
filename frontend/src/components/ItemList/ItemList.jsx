import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";


const ItemList = ({ items }) => {
  const navigate = useNavigate()
  const [user, token] = useAuth();
  console.log('ItemList',user)
  return (
    <div>
      {items.map((item) => (
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
          <li>
            {user ? (
            <button onClick={() => navigate(`/items/${item.id}`)}>Edit Item</button>
            )
          : ( " ")}
        </li>

        </div>
      ))}
    </div>
  );
};

export default ItemList;
