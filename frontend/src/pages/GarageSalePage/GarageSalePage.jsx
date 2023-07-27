import React, { useState, useEffect } from 'react';
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
    <div className='page-container'>
      <p className='outlined-text'>Garage Sale Details</p>
      <div className='display'>
        {garageSaleDetails && <GarageSaleDetails garageSaleDetails={garageSaleDetails} />}
        {garageSaleDetails && <AddItemForm garageSale={garageSaleDetails} fetchGarageSale={fetchGarageSale}/>}
        {garageSaleDetails && <GarageSaleMap fullAddress={fullAddress()} markerText={garageSaleDetails.name}/>}
        
      </div>
      <div className='gs-sale-additem'>
        
      </div>

      {garageSaleDetails && <ItemList garageSaleDetails={garageSaleDetails} garageSaleId = {garage_sale_id} fetchGarageSale={fetchGarageSale}/>}
    </div>
  );
}

export default GarageSalePage;