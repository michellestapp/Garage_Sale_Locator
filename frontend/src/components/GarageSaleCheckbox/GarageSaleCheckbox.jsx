const GarageSaleCheckbox = ({ garageSaleId, isSelected, onChange }) => {
    return (
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(garageSaleId)}
      />
    );
  };
export default GarageSaleCheckbox;