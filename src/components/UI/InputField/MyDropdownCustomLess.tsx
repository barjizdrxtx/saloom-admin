import React, { useState, useEffect, Fragment } from "react";
import { CustomIcon } from "../Icons/Icons";
import { IconButton } from "@/components/UI/Icons/Icons";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

const MyDropdownCustomLess = ({
  data,
  onChange,
  error,
  refetchSeatcategory,
  setDisabledColor,
  editPrice,
  value,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(undefined);
  const [editingId, setEditingId] = useState(null);
  const [editedCategory, setEditedCategory] = useState("");
  const [editedCategoryArb, setEditedCategoryArb] = useState("");
  const [category, setCategory] = useState("");
  const [categoryArb, setCategoryArb] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (value && data?.dropData?.length) {
      const selectedItem = data.dropData.find((el: any) => el?.id === value);
      if (selectedItem) {
        setList(selectedItem[data.dropTitle] || "Default");
        setDisabledColor(selectedItem[data.dropTitle] || "Default");
      }
    }
  }, [value, data, setDisabledColor]);

  const token = Cookies.get("saloom_access_token");

  const handleSelectOption = (selectedValue: any) => {
    setIsOpen(false);
    onChange(selectedValue.id);
    setList(selectedValue[data.dropTitle] || "Default");
    setDisabledColor(selectedValue[data.dropTitle] || "Default");
  };

  const onDelete = (id: any) => {
    if (!id) return; // Safeguard against invalid IDs
    axios
      .delete(`/seat-category/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setList(undefined);
        refetchSeatcategory();
      })
      .catch(() => {
        message.error("Please Try Again");
      });
  };

  const onAddNewSeatCategory = () => {
    if (!category || !categoryArb) return; // Prevent invalid API requests
    axios
      .post(
        "/seat-category",
        {
          category,
          categoryArb,
          color: "string",
          isEnabled: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setCategory("");
        setCategoryArb("");
        refetchSeatcategory();
      })
      .catch(() => {
        message.error("Please Try Again");
      });
  };

  const onUpdateCategory = (id: any) => {
    if (!id || !editedCategory || !editedCategoryArb) return; // Prevent invalid API requests
    axios
      .patch(
        `/seat-category/${id}`,
        {
          category: editedCategory,
          categoryArb: editedCategoryArb,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setEditingId(null);
        setEditedCategory("");
        setEditedCategoryArb("");
        refetchSeatcategory();
      })
      .catch(() => {
        message.error("Please Try Again");
      });
  };

  const startEditing = (el: any) => {
    if (!el) return; // Safeguard
    setEditingId(el.id);
    setEditedCategory(el.category || "");
    setEditedCategoryArb(el.categoryArb || "");
  };

  return (
    <div className="w-full flex flex-col mt-4">
      <label className="pb-1 font-semibold text-sm text-gray-700">
        {data?.title || "Dropdown"}
      </label>
      <div className="w-full relative">
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex justify-between items-center w-full p-3 text-sm font-medium border rounded-lg bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <span className="capitalize text-gray-700">
            {list || `Select a ${data?.title || "option"}`}
          </span>
          <CustomIcon name="arrow_drop_down" />
        </button>

        {isOpen && (
          <div className="bg-white w-full absolute z-50 mt-2 rounded-lg shadow-lg border overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              {data?.dropData?.length ? (
                data.dropData.map((el: any) => (
                  <div
                    key={el?.id}
                    className="flex justify-between items-center text-sm p-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    {editingId === el?.id ? (
                      <div className="w-full flex flex-col p-2">
                        <input
                          type="text"
                          value={editedCategory}
                          onChange={(e) =>
                            setEditedCategory(e.target.value || "")
                          }
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="Edit category (English)"
                        />
                        <input
                          type="text"
                          value={editedCategoryArb}
                          onChange={(e) =>
                            setEditedCategoryArb(e.target.value || "")
                          }
                          className="w-full p-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="Edit category (Arabic)"
                        />
                        <div className="flex justify-end mt-2 space-x-3">
                          <button
                            onClick={() => onUpdateCategory(el?.id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        <div
                          onClick={() => handleSelectOption(el)}
                          className="flex-1 capitalize"
                        >
                          {el?.[data.dropTitle]} ({el?.categoryArb})
                        </div>

                        <div className="flex space-x-2">
                          <IconButton onClick={() => startEditing(el)}>
                            <CustomIcon
                              name="edit"
                              className="text-green-500 hover:text-green-700"
                            />
                          </IconButton>
                          <IconButton onClick={() => onDelete(el?.id)}>
                            <CustomIcon
                              name="delete"
                              className="text-red-500 hover:text-red-700"
                            />
                          </IconButton>
                        </div>
                      </Fragment>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm p-3">
                  No options available.
                </div>
              )}
            </div>
            <div className="flex items-center p-3 border-t bg-gray-50">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Add category (English)"
                className="w-full p-2 mr-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                value={categoryArb}
                onChange={(e) => setCategoryArb(e.target.value)}
                type="text"
                placeholder="Add category (Arabic)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={
                  category && categoryArb ? onAddNewSeatCategory : undefined
                }
                className={`ml-2 ${
                  category && categoryArb
                    ? "text-blue-500"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                <CustomIcon name="add" />
              </button>
            </div>
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default MyDropdownCustomLess;
