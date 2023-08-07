import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";
import './NewSalePage.css'
import api from "../../utils/api";

const NewSalePage = ({}) => {
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
      let response = await api.post(
        "/garage_sales",
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
    <div className="page-container">
      <div className="form-format">
      <form  onSubmit={(event) => handleSubmit(event)}>
        <label className="new-sale-font">Sale Name:{" "}
          <input className="new-sale-field" type="text" name="name" value={formData.name} onChange={handleInputChange}/>
        </label>
        <div>
          <label className="new-sale-font">Date of Sale:{""}
            <input className="new-sale-field" type="date" name="date" value={formData.date} onChange={handleInputChange}/>
          </label>
        </div>
        <label className="new-sale-font">Start time:{""}
          <input  className="new-sale-field" type="time" name="start_time" value={formData.start_time} onChange={handleInputChange}/>
        </label>
        <label className="new-sale-font">End time:{""}
          <input className="new-sale-field" type="time" name="end_time" value={formData.end_time} onChange={handleInputChange}/>
        </label>
        <div>
          <label className="new-sale-font">Street Address:{" "}
            <input className="new-sale-field" type="text" name="street_address" value={formData.street_address} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label className="new-sale-font">City:{" "}
            <input className="new-sale-field" type="text" name="city"  value={formData.city} onChange={handleInputChange}/>
          </label>
          <label className="new-sale-font">State:{" "}
            <input  className="new-sale-field" type="text" name="state" value={formData.state} onChange={handleInputChange}/>
          </label>
          <label className="new-sale-font">Zip:{" "}
            <input className="new-sale-field" type="text" name="zip" value={formData.zip} onChange={handleInputChange} />
          </label>
        </div>
        <button className="btn btn-light btn-outline-dark btn-sm" type="submit">Add Sale</button>
      </form>
      </div>
    </div>
  );
};
 
export default NewSalePage;