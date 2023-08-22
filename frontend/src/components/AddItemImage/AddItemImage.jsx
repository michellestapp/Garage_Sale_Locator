import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";




const AddItemImage = ({itemId,  fetchGarageSale}) => {
    const [user, token] = useAuth();
    const [image, setImage] = useState("");

    const handleFileInputChange = (event) => {
        setImage(event.target.files[0]);
    };

    const postImage = async () => {
        try {
          const form = new FormData();
          form.append("image", image || "");
    
          const response = await api.post(
            `/items/${itemId}/image`,
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


      return (
        <div>
          <label>
            Image:
            <input type="file" name="image" onChange={handleFileInputChange} />
          </label>
          <div>
          <button
            type="button" 
            className="btn btn-light btn-outline-dark btn-sm"
            onClick={postImage}
          >
            Upload Image
          </button>
          </div>
        </div>
      );
}
 
export default AddItemImage;