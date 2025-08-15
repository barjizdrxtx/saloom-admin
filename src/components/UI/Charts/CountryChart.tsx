import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const CountryChart = ({ data }: any) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [colors, setColors] = useState<string[]>([
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
    "rgba(255, 99, 132, 0.7)",
  ]);
  const [borderColors, setBorderColors] = useState<string[]>([
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 99, 132, 1)",
  ]);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    const chartData = data?.reduce(
      (acc: any, item: any) => {
        if (item.values) {
          acc.labels.push(item.contryCode);
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
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
              },
              padding: 15,
              color: "gray",
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.label}: ${tooltipItem.raw} Bookings`,
            },
          },
        },
      },
    });
  }, [data, colors, borderColors]);

  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center relative">
      <button
        onClick={() => setShow(!show)}
        className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Show Countries
      </button>
      <div className="relative w-full h-64 mt-5">
        <canvas ref={chartRef} className="absolute inset-0 w-full h-full" />
      </div>
      {show && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShow(false)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-2xl border border-gray-300 w-4/5 max-w-md overflow-y-auto"
            style={{ maxHeight: "50vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Country List
            </h3>
            <div className="space-y-2">
              {data?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <div
                    className="w-3 h-3"
                    style={{
                      backgroundColor: colors[index % colors.length],
                      borderRadius: "50%",
                    }}
                  />
                  <span className="text-sm font-medium">{item.contryCode}</span>
                  <span className="text-sm">{item.values.length} Bookings</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryChart;
