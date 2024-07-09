// utils/parseCommodityData.js
export const parseCommodityData = (rawData) => {
    const commodities = {
      COCOA: [],
      COFFEE_ARABIC: [],
      COFFEE_ROBUS: [],
      TEA_MOMBASA: [],
      // Add other commodities as needed
    };
  
    rawData.forEach(row => {
      const [date, ...prices] = row;
      const parsedDate = new Date(date);
      const yearMonth = `${parsedDate.getFullYear()}${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  
      prices.forEach((price, index) => {
        if (commodities[`COMMODITY_${index}`]) {
          commodities[`COMMODITY_${index}`].push({
            date: yearMonth,
            price,
          });
        }
      });
    });
  
    return commodities;
  };
  