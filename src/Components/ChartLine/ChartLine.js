import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import "./ChartLine.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartLine({historicalData, type}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Portfolio CLhine Cart",
      },
    },

    scales: {
      xAxis: {
        display: true,
        grid: {
          display: false,
        },
      },
      yAxis: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const optionsMini = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "",
      },
    },

    scales: {
      xAxis: {
        display: false,
        grid: {
          display: false,
        },
      },
      yAxis: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];
  const testData = [
    "5",
    "1",
    "11",
    "3",
    "7",
    "0",
    "6",
    "13",
    "8",
    "9",
    "10",
    "4",
    "12",
    "2",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: testData,
        borderColor: "rgb(28, 253, 28)",
        backgroundColor: "rgba(28, 253, 28, 0.5)",
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  switch(type){
    case "mini":
      return (
        <div className="ChartContainerMini">
          <Line options={optionsMini} data={data} />
        </div>
      );
      break;
    case "big":
      return (
        <div className="ChartContainerBig">
          <Line options={options} data={data} />
        </div>
      );
      break;
    default:
      return (
        <div className="ChartContainerMini">
          <Line options={optionsMini} data={data} />
        </div>
      );
      break;
  }
}
export default ChartLine;
