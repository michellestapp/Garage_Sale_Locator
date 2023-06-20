import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const ItemList = ({ garageSaleDetails, garageSaleId, fetchGarageSale }) => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [image, setImage] = useState("");

  const handleEditItem = (item) => {
    navigate(`/items/${item.id}`, {
      state: { item, garageSaleId: garageSaleId },
    });
  };

  const postImage = async (item) => {
    try {
      const form = new FormData();
      form.append("image", image || "");

      const response = await axios.post(
        `http://127.0.0.1:5000/api/items/${item.id}/image`,
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status===200) {
        await fetchGarageSale();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteItem = async (item) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/items/${item.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 204) {
        await fetchGarageSale();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };



  function handleFileInputChange(event) {
    setImage(event.target.files[0])
  }


  return (
    <div className="pad-category">
      {garageSaleDetails.items.map((item) => (
        <div key={item.id} className="item-container">
          {item.image ? (
            <img className="image-props pad-category"
              src={`http://127.0.0.1:5000/images/${item.image}`}
              alt={item.name_of_item}
            />
          ) : (
            <span>No image available</span>
          )}
          <p className="item-format">Item Name: {item.name_of_item}</p>
          <p className="item-format">Item Description: {item.description}</p>
          <p className="item-format">Price: ${item.price}</p>
          <p className="item-format">Category: {item.category}</p>
        <div>
        <label>
            Image: <input type="file" name="image" onChange={handleFileInputChange} />
         { image &&  <button onClick ={() => postImage(item)}>Upload Image</button>}
        </label>
      </div>

            {user.id == garageSaleDetails.user.id ? (
              <button className="btn btn-light btn-outline-dark btn-sm button-margin" onClick={() => handleEditItem(item)}>Edit Item</button>
            ) : (
              " "
            )}
  
            {user.id == garageSaleDetails.user.id ? (
              <button className="btn btn-light btn-outline-dark btn-sm" onClick={() => deleteItem(item)}>Delete Item</button>
            ) : (
              " "
            )}

        </div>
      ))}
    </div>
  );
};

export default ItemList;
