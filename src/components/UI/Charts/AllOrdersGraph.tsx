import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AllOrdersGraph = () => {
  const data = [
    { totalAmount: 100 },
    { totalAmount: 200 },
    { totalAmount: 150 },
    // Add more data as needed
  ];

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data?.map((item: any) => ""), // Empty labels to remove x-axis labels
          datasets: [
            {
              label: "", // Empty label to remove dataset label
              data: data?.map((item: any) => item.totalAmount),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "dodgerblue",
              borderWidth: 2,
              hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // Hide x-axis
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Hide y-axis grid
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Set to false to hide the legend
            },
            tooltip: {
              enabled: true, // Enable tooltip
              mode: "nearest", // Display the tooltip for the nearest data point
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart when the component unmounts or when data changes
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]); // Re-run the effect when 'data' prop changes

  return (
    <div className="flex justify-center w-full">
      <canvas
        ref={chartRef}
        className="w-full h-fit-content md:h-60vh"
      ></canvas>
    </div>
  );
};

export default AllOrdersGraph;
