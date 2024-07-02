const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Orders Summary</h2>
          <p className="mt-2 text-gray-700">Total Orders: <span className="font-bold text-gray-900">120</span></p>
          <p className="mt-2 text-gray-700">Pending Orders: <span className="font-bold text-gray-900">30</span></p>
          <p className="mt-2 text-gray-700">Completed Orders: <span className="font-bold text-gray-900">90</span></p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Quotes Summary</h2>
          <p className="mt-2 text-gray-700">Total Quotes: <span className="font-bold text-gray-900">50</span></p>
          <p className="mt-2 text-gray-700">Pending Quotes: <span className="font-bold text-gray-900">10</span></p>
          <p className="mt-2 text-gray-700">Approved Quotes: <span className="font-bold text-gray-900">40</span></p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Farmers Summary</h2>
          <p className="mt-2 text-gray-700">Total Farmers: <span className="font-bold text-gray-900">80</span></p>
          <p className="mt-2 text-gray-700">New Farmers: <span className="font-bold text-gray-900">15</span></p>
          <p className="mt-2 text-gray-700">Active Farmers: <span className="font-bold text-gray-900">65</span></p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Buyers Summary</h2>
          <p className="mt-2 text-gray-700">Total Buyers: <span className="font-bold text-gray-900">60</span></p>
          <p className="mt-2 text-gray-700">New Buyers: <span className="font-bold text-gray-900">10</span></p>
          <p className="mt-2 text-gray-700">Active Buyers: <span className="font-bold text-gray-900">50</span></p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD001</td>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">Completed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD002</td>
                  <td className="px-6 py-4 whitespace-nowrap">Alice Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">Bob Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-600">Pending</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">ORD003</td>
                  <td className="px-6 py-4 whitespace-nowrap">Charlie Green</td>
                  <td className="px-6 py-4 whitespace-nowrap">Daisy White</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
