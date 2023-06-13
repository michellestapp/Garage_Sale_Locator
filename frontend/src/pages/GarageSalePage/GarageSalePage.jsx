import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GarageSaleDetails from '../../components/GarageSaleDetails/GarageSaleDetails';

function GarageSalePage() {
  const { garage_sale_id } = useParams();
  const [garageSaleDetails, setGarageSaleDetails] = useState(null);

  useEffect(() => {
    fetchGarageSale();
  }, [garage_sale_id]);
  console.log(garage_sale_id)

  const fetchGarageSale = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/garage_sales/${garage_sale_id}`);
      const garageSaleData = response.data;
      setGarageSaleDetails(garageSaleData);
      console.log(garage_sale_id)
    } catch (error) {
      console.error('Error getting garage sale details', error);
    }
  };

  return (
    <div>
      <h1>Garage Sale Details</h1>
      {garageSaleDetails && <GarageSaleDetails garageSaleDetails={garageSaleDetails} />}
    </div>
  );
}

export default GarageSalePage;