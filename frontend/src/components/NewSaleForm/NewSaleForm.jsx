import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";


const NewSaleForm = () => {
  const navigate = useNavigate()
  const [user, token] = useAuth();
  const [formData, handleInputChange, reset] = useCustomForm({
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    street_address: "",
    city: "",
    state: "",
    zip: "",
  });

  async function postSale() {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/garage_sales",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    //   reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error response data:", error.response.data);
      } else {
        console.log("Error:", error);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    postSale();
    navigate('/mySalesPage');
    
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Sale Name:{" "}
          <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
        </label>
        <div>
          <label>Date of Sale:{""}
            <input type="date" name="date" value={formData.date} onChange={handleInputChange}/>
          </label>
        </div>
        <label>Start time:{""}
          <input type="time" name="start_time" value={formData.start_time} onChange={handleInputChange}/>
        </label>
        <label>End time:{""}
          <input type="time" name="end_time" value={formData.end_time} onChange={handleInputChange}/>
        </label>
        <div>
          <label>Street Address:{" "}
            <input type="text" name="street_address" value={formData.street_address} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>City:{" "}
            <input type="text" name="city"  value={formData.city} onChange={handleInputChange}/>
          </label>
          <label>State:{" "}
            <input type="text" name="state" value={formData.state} onChange={handleInputChange}/>
          </label>
          <label>Zip:{" "}
            <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
};

export default NewSaleForm;
