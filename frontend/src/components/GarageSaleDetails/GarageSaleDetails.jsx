import React from "react";
import axios from "axios";


const GarageSaleDetails = ({garageSaleDetails}) => {
    console.log(garageSaleDetails)
    return ( 
        <div>
            <h1>Details</h1>
            <div>
                <p>Name: {garageSaleDetails.name}</p>
                <p>Date of Sale: {garageSaleDetails.date}</p>
                <br />
                {garageSaleDetails.items.map((item) => (
                    <div key={item.id}>
                    <h3>Item Name: {item.name_of_item}</h3>
                    <img src={`http://127.0.0.1:5000/images/${item.image}`} alt={item.name_of_item}/>
                    <h1>{item.image}</h1>
                    </div>
      ))}
            </div>
        </div>
     );
}
 
export default GarageSaleDetails;