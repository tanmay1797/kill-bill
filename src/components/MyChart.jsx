// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const MyChart = ({ dataChart }) => {
//   // Data for the chart

//   console.log("mychart", dataChart);
//   const data = {
//     labels: Object.keys(dataChart),
//     datasets: [
//       {
//         label: "",
//         // data: [65, 59, 80, 81, 56, 55, 40],
//         data: Object.values(dataChart),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Month Wise Collection",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default MyChart;

////
// export const MyChart = (chartData) => {
//   const ctx = document.getElementById("myChart");

//   new ChartJS(ctx, {
//     type: "bar",
//     data: {
//       // labels: ["Jan", "Feb", "March", "April", "May", "June"],
//       labels: Object.keys(chartData),
//       datasets: [
//         {
//           label: "Month Wise Collection",
//           data: Object.values(chartData),
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });

//   return (

//   );
// };

////

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Function to process invoices and aggregate data by month
const monthWiseCollection = (invoices) => {
  const chartData = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  invoices.forEach((item) => {
    const invoiceDate = new Date(item.invoiceDate);
    if (invoiceDate.getFullYear() === new Date().getFullYear()) {
      const monthName = invoiceDate.toLocaleDateString("default", {
        month: "long",
      });
      console.log("monthname", monthName);
      chartData[monthName] += item.totalPrice;
    }
  });

  return chartData;
};

const MyChart = ({ invoices }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  console.log("chart", invoices);

  useEffect(() => {
    const data = monthWiseCollection(invoices);
    setChartData({
      labels: Object.keys(data),
      datasets: [
        {
          label: "Monthly Totals",
          data: Object.values(data),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Totals for Current Year",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart Example</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MyChart;
