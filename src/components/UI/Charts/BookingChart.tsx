// components/BookingChart.js
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BookingChart = ({ weeklyData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const labels = weeklyData?.map((week) => week.weekKey);
      const data = weeklyData?.map((week) => week.values.length);

      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Bookings per Week",
              data: data,
              backgroundColor: "rgba(207, 169, 60, 0.7)", // Soft golden color
              hoverBackgroundColor: "rgba(207, 169, 60, 1)", // Darker on hover
              barThickness: 20,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: "easeInOutQuad",
          },
          plugins: {
            legend: {
              display: false, // Minimalist approach by hiding the legend
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Week",
                color: "#333",
                font: {
                  size: 14,
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Bookings",
                color: "#333",
                font: {
                  size: 14,
                },
              },
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                color: "#333",
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)", // Soft grid lines for a clean look
              },
            },
          },
        },
      });

      return () => chartInstance.destroy(); // Cleanup on component unmount
    }
  }, [weeklyData]);

  return (
    <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <canvas ref={chartRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  );
};

export default BookingChart;
