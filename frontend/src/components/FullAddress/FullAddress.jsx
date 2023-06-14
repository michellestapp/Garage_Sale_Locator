import React from 'react';

const fullAddress = ({garageSaleDetails}) => {
  return `${garageSaleDetails.streetAddress}, ${garageSaleDetails.city}, ${garageSaleDetails.state} ${garageSaleDetails.zip}`;
};

const AddressComponent = ({ streetAddress, city, state, zip }) => {
  const fullAddress = createFullAddress(streetAddress, city, state, zip);

  return (
    <div>
      <p>Full Address: {fullAddress}</p>
    </div>
  );
};

export default AddressComponent;