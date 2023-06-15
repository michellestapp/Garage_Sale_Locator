import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MySales from '../../components/MySales/MySales';
import useAuth from "../../hooks/useAuth";

const MySalesPage = () => {
  const [user, token] = useAuth();
  const [mySales, setMySales] = useState([]);

  useEffect(() => {
    const fetchMySales = async () => {
      try {
        let response = await axios.get('http://127.0.0.1:5000/api/garage_sales', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setMySales(response.data);
        console.log(mySales);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchMySales();
  }, [token]);

  return (
    <div>
      <h1>My Sales</h1>
      <MySales user={user} mySales={mySales} />
    </div>
  );
};

export default MySalesPage;