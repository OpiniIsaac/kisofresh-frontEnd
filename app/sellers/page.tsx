// components/Dashboard/Inventory.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchInventory = async () => {
  const { data } = await axios.get('/api/inventory');
  return data;
};

const Inventory = () => {
  
const data = [
    { "id": 1, "name": "Maize", "stock": 150 },
    { "id": 2, "name": "Rice", "stock": 200 },
    { "id": 3, "name": "Beans", "stock": 300 },
    { "id": 4, "name": "Wheat", "stock": 50 }
  ]
  


  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      <ul>
        {data.map(item => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.stock}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
