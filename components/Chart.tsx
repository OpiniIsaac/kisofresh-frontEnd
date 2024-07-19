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

type CropPrice = {
  _id: string;
  Date: string;
  Crop: string;
  Prices: number;
  date?: Date; // Add this to store parsed date
};

export default function PriceChart({ crop , unit}: any  ) {
  const [data, setData] = useState<CropPrice[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("All Years");

  useEffect(() => {
    if (crop) {
      axios
        .get("/api/cropPrices")
        .then((response) => {
          const filteredData: CropPrice[] = response.data
            .filter((item: CropPrice) => item.Crop === crop)
            .filter((d:any) => d.Date); // Filter out any entries with null or empty dates

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
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [crop]);

  const availableYears = Array.from(
    new Set(data.map((d) => d.date!.getFullYear().toString()))
  ).sort();

  const filteredData =
    selectedYear === "All Years"
      ? data
      : data.filter((d) => d.date!.getFullYear().toString() === selectedYear);

  // Function to group data by year and sort months within each year
  const groupedData = filteredData.reduce<{ [key: string]: CropPrice[] }>(
    (acc, curr) => {
      const year = curr.date!.getFullYear().toString();
      acc[year] = acc[year] || [];
      acc[year].push(curr);
      acc[year].sort((a, b) => a.date!.getMonth() - b.date!.getMonth());
      return acc;
    },
    {}
  );

  // Flatten grouped data back into a single array
  const chartData = Object.values(groupedData).flat();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{crop} Price Trends in {unit}</h2>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="All Years">All Years</option>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => format(new Date(tick), "MMM yyyy")}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => format(new Date(label), "MMM yyyy")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Prices"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
