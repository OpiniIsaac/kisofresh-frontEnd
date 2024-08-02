"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { FaChartLine, FaHistory, FaBell, FaLightbulb, FaSyncAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Add a spinner package
import { useSpring, animated } from '@react-spring/web'; // Import react-spring

type CropPrice = {
  _id: string;
  Date: string;
  Crop: string;
  Prices: number;
  date?: Date;
};

const crops = ["Coffee, Arabica", "Cocoa", "Tea, Mombasa"];

export default function HighlightGraph() {
  const [data, setData] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("/api/cropPrices", {
        params: { crops },
      })
      .then((response) => {
        const filteredData: CropPrice[] = response.data
          .filter((item: CropPrice) => crops.includes(item.Crop))
          .filter((d: any) => d.Date); // Filter out any entries with null or empty dates

        const parseDate = (dateStr: string) => {
          return new Date(dateStr);
        };

        const orderedData = filteredData
          .map((d) => ({
            ...d,
            date: parseDate(d.Date),
          }))
          .sort((a, b) => a.date!.getTime() - b.date!.getTime());

        setData(orderedData);
        setLoading(false); // Set loading to false when data is ready
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false); // Also set loading to false if there's an error
      });
  }, []);

  const chartData = data.map((d) => ({
    ...d,
    date: d.date ? format(d.date, "MMM yyyy") : "",
  }));

  // Animation for the loading spinner
  const loadingProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: loading ? 1 : 0 },
    config: { duration: 500 },
  });

  // Animation for the chart
  const chartProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: loading ? 0 : 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="bg-white mx-16 p-6 rounded-lg flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6 text-center md:text-left text-gray-800">Platform Features</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Our platform offers comprehensive insights into the price trends of key crops such as Cocoa, Coffee, and Tea. With real-time data and historical trends, farmers and traders can make informed decisions to maximize their profits.
        </p>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center">
            <FaSyncAlt className="text-blue-500 mr-3" />
            <span>Real-time price tracking</span>
          </li>
          <li className="flex items-center">
            <FaHistory className="text-green-500 mr-3" />
            <span>Historical data analysis</span>
          </li>
          <li className="flex items-center">
            <FaChartLine className="text-purple-500 mr-3" />
            <span>Interactive graphs and charts</span>
          </li>
          <li className="flex items-center">
            <FaBell className="text-red-500 mr-3" />
            <span>Customizable alerts and notifications</span>
          </li>
          <li className="flex items-center">
            <FaLightbulb className="text-yellow-500 mr-3" />
            <span>In-depth market insights</span>
          </li>
        </ul>
      </div>
      <div className="md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Price Trends</h2>
        <p className="text-center mb-4 text-gray-700">
          An overview of the price trends for Cocoa, Coffee, and Tea.
        </p>
        {loading ? (
          <animated.div style={loadingProps} className="flex justify-center items-center h-96">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </animated.div>
        ) : (
          <animated.div style={chartProps}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(tick) => tick}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip labelFormatter={(label) => label} />
                <Legend />
                {crops.map((crop, index) => (
                  <Line
                    key={crop}
                    type="monotone"
                    dataKey={(d: CropPrice) => (d.Crop === crop ? d.Prices : null)}
                    name={crop}
                    stroke={["#8884d8", "#82ca9d", "#ffc658"][index]}
                    activeDot={{ r: 8 }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </animated.div>
        )}
      </div>
    </div>
  );
}
