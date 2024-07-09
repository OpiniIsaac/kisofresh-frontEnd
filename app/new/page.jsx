// App.js or wherever you want to use the chart
'use client'
import React, { useState } from 'react';
import CropPriceChart from './_components/Chart';


function page() {

const [selectedFile, setSelectedFile] = useState(null);

// Function to handle file selection
const handleFileChange = (event) => {
  const file = event.target.files[0];
  // Update the state with the newly selected file
  setSelectedFile(file);
};

return (
  <div>
    <input type="file" onChange={handleFileChange} />
    {/* Check if a file has been selected before rendering the chart */}
    {selectedFile && <CropPriceChart file={selectedFile} />}
  </div>
);
}


export default page;
