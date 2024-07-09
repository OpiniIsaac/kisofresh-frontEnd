"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

type CropPrice = {
  _id: string;
  Date: string;
  Crop: string;
  Prices: number;
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

export default function PriceChart() {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const router = useRouter();
  const { crop } = router.query;

  useEffect(() => {
    if (crop) {
      axios.get('/api/cropPrices')
        .then(response => {
          const filteredData: CropPrice[] = response.data.filter((item: CropPrice) => item.Crop === crop);
          const labels = filteredData.map(item => item.Date);
          const prices = filteredData.map(item => item.Prices);
          setChartData({
            labels: labels,
            datasets: [
              {
                label: `${crop} Prices`,
                data: prices,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
              }
            ]
          });
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [crop]);

  // Ensure the component renders only on the client side
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{crop} Price Trends</h2>
      <Line data={chartData} />
    </div>
  );
}
