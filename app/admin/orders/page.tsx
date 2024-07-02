

const Orders = () => {
  return (
   
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>
       
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD001</td>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">Completed</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-06-20</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD002</td>
                  <td className="px-6 py-4 whitespace-nowrap">Alice Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">Bob Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-600">Pending</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-06-21</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD003</td>
                  <td className="px-6 py-4 whitespace-nowrap">Charlie Green</td>
                  <td className="px-6 py-4 whitespace-nowrap">Daisy White</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">Completed</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-06-22</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD004</td>
                  <td className="px-6 py-4 whitespace-nowrap">Ella Black</td>
                  <td className="px-6 py-4 whitespace-nowrap">Frank Yellow</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">Cancelled</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-06-23</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD005</td>
                  <td className="px-6 py-4 whitespace-nowrap">George Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">Helen Blue</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">Completed</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-06-24</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  );
};

export default Orders;
