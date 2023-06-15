import React from "react";

const ItemDetails = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <img
            src={`http://127.0.0.1:5000/images/${item.image}`}
            alt={item.name_of_item}
          />
          <p>Item Name: {item.name_of_item}</p>
          <p>Item Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          {/* <li>{user? (
            <button onClick = {() => navigate("/editItem")}>Edit Item</button>)
          : ( " ")}
        </li> */}
        </div>
      ))}
    </div>
  );
};

export default ItemDetails;
