import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MySales = ({ user, mySales }) => {
    const navigate = useNavigate();
    // const handleClick = () => navigate(`/garage_sale/${garage_sale.garage_sale_id}`)
  return (
    <div>
      <h1>{user.username}'s Sale Summary</h1>
      <div>
        {mySales && mySales.length > 0 ? (
          mySales.map((garage_sale, index) => (
            <Link to={`/garage_sale/${garage_sale.garage_sale_id}`} key={index}>
              {/* <div onClick={handleClick}> */}
              <div>
                {garage_sale.name}
              </div>
            </Link>
          ))
        ) : (
          <p>No Sales Posted</p>
        )}
      </div>
    </div>
  );
};

export default MySales;