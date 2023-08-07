const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
  
  
  
  const formatTime = (timeString) => {
      const timeParts = timeString.split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

  const getUniqueCategories = (garageSales) => {
    const uniqueCategories = new Set();
  
    garageSales.forEach((garage_sale) => {
      garage_sale.items.forEach((item) => {
        uniqueCategories.add(item.category);
      });
    });
  
    return Array.from(uniqueCategories);
  };
  
  export {formatDate, formatTime, getUniqueCategories};

