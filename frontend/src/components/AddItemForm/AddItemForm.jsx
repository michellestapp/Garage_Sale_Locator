import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";
import "./AddItemForm.css";

const AddItemForm = ({ garageSale, fetchGarageSale }) => {
  const [user, token] = useAuth();
  const [formData, setFormData] = useState({
    name_of_item: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);

  async function addItem() {
    try {
      let response = await api.post(
        `/user_items/${garageSale.id}`,
        {
          name_of_item: formData.name_of_item,
          description: formData.description,
          price: formData.price,
          category: formData.category,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        await fetchGarageSale();
      }
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
    addItem();
  }

  function handleInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
  if (!user) {
    return null;
  }

  return (
    garageSale.user.id === user.id && (
      <div className="add-item-button-container">
        <button className="add-item-button" onClick={() => setShowModal(true)}>
          Add Item
        </button>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form className="add-item-form" onSubmit={handleSubmit}>
                <div>
                  <label className="form-font">
                    Item Name:{" "}
                    <input type="text" name="name_of_item" value={formData.name_of_item} onChange={handleInputChange}/>
                  </label>
                </div>
                <div>
                  <label className="form-font">
                    Description:{" "}
                    <input className="add-item-desc-input" type="text" name="description" value={formData.description} onChange={handleInputChange} />
                  </label>
                </div>
                <label className="form-font">
                  Price:{" "}
                  <input className="add-item-price" type="number" name="price" value={formData.price} onChange={handleInputChange}/>
                </label>
                <label className="form-font">
                  Category:
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Books">Books</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </label>
                <div>
                  <button className="btn btn-light submit-item-button" type="submit" >Save Item </button>
                  <button className="btn btn-light submit-item-button" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default AddItemForm;