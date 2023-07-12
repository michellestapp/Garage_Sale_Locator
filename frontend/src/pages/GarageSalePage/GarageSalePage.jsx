import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useLocation } from 'react-router-dom';
import GarageSaleDetails from '../../components/GarageSaleDetails/GarageSaleDetails';
import GarageSaleMap from '../../components/GarageSaleMap/GarageSaleMap';
import ItemList from '../../components/ItemList/ItemList';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import './GarageSalePage.css'
import api from '../../utils/api';


function GarageSalePage() {
  const { garage_sale_id } = useParams();
  const [garageSaleDetails, setGarageSaleDetails] = useState(null);
  const location = useLocation();
  const fullAddress = () => {
    return `${garageSaleDetails.street_address}, ${garageSaleDetails.city}, ${garageSaleDetails.state} ${garageSaleDetails.zip}`;
  };

  useEffect(() => {
    fetchGarageSale();
  }, [garage_sale_id]);
 

  const fetchGarageSale = async () => {
    try {
      const response = await api.get(`/garage_sales/${garage_sale_id}`);
      const garageSaleData = response.data;
      setGarageSaleDetails(garageSaleData);

    } catch (error) {
      console.error('Error getting garage sale details', error);
    }
  };



  return (
    <div className='background-format display color'>
      <h1>Garage Sale Details</h1>
      {garageSaleDetails && <GarageSaleMap fullAddress={fullAddress()} markerText={garageSaleDetails.name}/>}
      <div className='gs-sale-additem color'>
      {garageSaleDetails && <GarageSaleDetails garageSaleDetails={garageSaleDetails} />}
      {garageSaleDetails && <AddItemForm garageSale={garageSaleDetails} fetchGarageSale={fetchGarageSale}/>}
      </div>

      {garageSaleDetails && <ItemList garageSaleDetails={garageSaleDetails} garageSaleId = {garage_sale_id} fetchGarageSale={fetchGarageSale}/>}
    </div>
  );
}

export default GarageSalePage;