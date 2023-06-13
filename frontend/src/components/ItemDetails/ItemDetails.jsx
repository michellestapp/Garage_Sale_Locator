import React, { useState } from 'react';

const ItemDetails = (items) => {
    return (
        <div> 
        <h1>Items</h1>
        <p>{items.name_of_item[0]}</p>
      

        </div>
     );
}
 
export default ItemDetails;