import React from "react";
import { formatDate, formatTime } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const GarageSaleCard = ({ garageSale, selected, toggleSelected }) => {
  const uniqueCategories = [...new Set(garageSale.items.map(item => item.category))];
    const navigate = useNavigate();

  return (
    <div className="card-link">
      <div>
        <input
          type="checkbox"
          value={garageSale.id}
          checked={selected}
          onChange={() => toggleSelected(garageSale.id)}
        />
        <div className="sale-format">{garageSale.name}</div>
        <div className="sale-data-format">Date: <p>{formatDate(garageSale.date)}</p></div>
        <div className="sale-data-format">Time:
          <p>{formatTime(garageSale.start_time)}-{formatTime(garageSale.end_time)}</p>
        </div>
        <div className="sale-data-format">Zip:<p>{garageSale.zip}</p></div>
        <p className="sale-data-format single-spacing" key={garageSale.id}>Sale Categories: </p>
        {uniqueCategories.map((category) => (
          <div key={category}>
            <p className="category-format  single-spacing">{category}</p>
          </div>
        ))}
        <button className="btn btn-dark" onClick={() => navigate(`/garage_sales/${garageSale.id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default GarageSaleCard;