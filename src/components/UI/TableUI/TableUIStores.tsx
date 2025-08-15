"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Actions from "@/components/UI/TableUI/Components/Actions";

const TableUIStores = ({
  apiName,
  tableName,
  tableColumns,
  getById = "id",
  page = 1,
  limit = 10,
  createButton,
  createButtonText = "Create",
  detailsRoute,
  deleteApi,
  editUrl,
  actionButton,
}: any) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getNestedValue = (obj: any, path: string) =>
    path
      .split(".")
      .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj);

  useEffect(() => {
    const fetchTable = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = Cookies.get("saloom_access_token") || "";
        const response = await axios.get(apiName, {
          params: { page, limit },
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (response.data.success) {
          setData(response.data.result);
        } else {
          setError(response.data.message || "Failed to load data.");
          setData([]);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Error fetching data."
        );
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTable();
  }, [apiName, page, limit]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-blue-300"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 text-center">{error}</div>;
  }

  const rows = data;
  const startIndex = (currentPage - 1) * limit;
  const totalPages = Math.ceil(total / limit) || 1;

  // helper for status badge classes
  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="p-4">
      {(tableName || createButton) && (
        <div className="flex justify-between items-center mb-4">
          {tableName && <h2 className="text-2xl font-semibold">{tableName}</h2>}
          {createButton && (
            <button
              onClick={() => router.push(createButton)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {createButtonText}
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider sticky top-0">
                  SL No
                </th>
                {tableColumns.map((col: any) => (
                  <th
                    key={col.value || col.title}
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider sticky top-0"
                  >
                    {col.title}
                  </th>
                ))}
                {actionButton && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider sticky top-0">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {rows.length > 0 ? (
                rows.map((row: any, idx: number) => {
                  const serial = startIndex + idx + 1;
                  return (
                    <tr
                      key={`${row[getById] ?? idx}-${currentPage}`}
                      className={`transition-colors duration-150 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 cursor-pointer`}
                      onClick={() => {
                        if (detailsRoute) {
                          router.push(
                            `${detailsRoute}&storeid=${row[getById]}`
                          );
                        }
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {serial}
                      </td>
                      {tableColumns.map((col: any) => {
                        const getNestedValue = (obj: any, path: string) =>
                          path
                            .split(".")
                            .reduce(
                              (acc, key) => (acc ? acc[key] : undefined),
                              obj
                            );

                        let cell = col.render
                          ? col.render(row)
                          : getNestedValue(row, col.value || "") ?? "";

                        if (col.isNumber) {
                          const num = Number(cell);
                          cell = isNaN(num) ? cell : num.toLocaleString();
                        }

                        return (
                          <td
                            key={col.value || col.title}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                          >
                            {cell}
                          </td>
                        );
                      })}
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Actions
                          id={row[getById]}
                          editUrl={editUrl}
                          deleteApi={deleteApi}
                          actionButton={actionButton}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={tableColumns.length + 2}
                    className="text-center py-8 text-gray-400"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableUIStores;
