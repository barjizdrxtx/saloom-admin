import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PaymentChart = ({ data }: any) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    const chartData = data?.reduce(
      (acc: any, item: any) => {
        if (item.values) {
          acc.labels.push(item.paymentMethod);
          acc.data.push(item.values.length);
        }
        return acc;
      },
      { labels: [], data: [] }
    );

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: chartData?.labels,
        datasets: [
          {
            label: "Bookings",
            data: chartData?.data,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          duration: 1200,
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 14,
                weight: "bold",
              },
              color: "#333",
              padding: 15,
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (tooltipItem) => {
                const total = tooltipItem.dataset.data.reduce(
                  (sum: number, value: number) => sum + value,
                  0
                );
                const value = tooltipItem.raw;
                const percentage = ((value / total) * 100).toFixed(1);
                return `Bookings: ${value} (${percentage}%)`;
              },
            },
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    });
  }, [data]);

  return (
    <div className="relative w-full h-72 md:h-96 p-4 bg-white rounded-lg">
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default PaymentChart;
