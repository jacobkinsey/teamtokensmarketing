import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  labels: string[];
  data: number[];
  backgroundColors: string[];
  hoverColors: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({
  labels,
  data,
  backgroundColors,
  hoverColors,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
      },
    ],
  };

  const chartOptions = {
    cutoutPercentage: 70,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "right",
      align: "end",
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DonutChart;
