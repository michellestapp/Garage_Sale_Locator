import React from 'react';

const ItemDetails = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h3>Item Name: {item.name_of_item}</h3>
          <img src={`http://127.0.0.1:5000/images/${item.image}`} alt={item.name_of_item} />
        </div>
      ))}
    </div>
  );
};

export default ItemDetails;