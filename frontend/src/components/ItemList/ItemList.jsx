import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";
import './ItemList.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AddItemImage from "../AddItemImage/AddItemImage";

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

      const response = await api.post(
        `/items/${item.id}/image`,
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        await fetchGarageSale();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteItem = async (item) => {
    try {
      const response = await api.delete(
        `/items/${item.id}`,
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
    setImage(event.target.files[0]);
  }

  return (
    <div className="item-grid-container">
      {garageSaleDetails &&
        garageSaleDetails.items.map((item) => (
          <div className="item-container container-color container-border border border-black " key={item.id}>
            {item.image ? (
              <img
                className="image-props pad-category"
                src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`}
                alt={item.name_of_item}
              />
            ) : (
              <p className="image-place-holder">No image available</p>
            )}
           
            <span className="item-label-font">Item Name:</span> {/* Apply a different font to the label */}
            <span className="item-name-font">{item.name_of_item}</span>
            <p></p>
            <span className="item-label-font">Price:</span>     
            <span className="item-name-font">${item.price}</span>
            <p></p>
            <span className="item-label-font">Category:</span> 
            <span className="item-name-font">{item.category}</span>

            {user?.id === garageSaleDetails.user.id && (
              //   <div className="file-font">
              //   <AddItemImage itemId={item.id} token={token} fetchGarageSale={fetchGarageSale} />
              // </div>

              <div className="file-font">
                <label className="pad-category">
                  Image: {" "}
                  <input
                    className="btn btn-light btn-outline-dark btn-sm button-margin btn-custom"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                  />
                </label>
              </div>
            )}
            {user?.id === garageSaleDetails.user.id && (
              <button className="btn btn-light btn-outline-dark btn-sm button-margin btn-custom" onClick={() => postImage(item)}>
                Upload Image
              </button>
            )}
            {user?.id === garageSaleDetails.user.id && (
              <button className="btn btn-light btn-outline-dark btn-sm button-margin btn-custom" onClick={() => handleEditItem(item)}>
                Edit Item
              </button>
            )}
            {user?.id === garageSaleDetails.user.id && (
              <button className="btn btn-light btn-outline-dark btn-sm btn-custom" onClick={() => deleteItem(item)}>
                Delete Item
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default ItemList;