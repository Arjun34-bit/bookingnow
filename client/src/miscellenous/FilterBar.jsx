import React, { useState } from "react";
import { getListingsByUser } from "../redux/listingReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FilterBar = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams();

    if (filters.type) searchParams.set("type", filters.type);
    if (filters.minPrice) searchParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice) searchParams.set("maxPrice", filters.maxPrice);

    navigate(`/listing?${searchParams.toString()}`);
  };

  const resetFilters = () => {
    setFilters({ type: "", minPrice: "", maxPrice: "" });
  };

  return (
    <div className="bg-white shadow-md p-2 rounded-lg flex flex-wrap justify-center md:justify-around items-center gap-4 mt-2">
      {/* Filter Title */}
      <span className="font-semibold text-gray-700">Filters:</span>

      {/* Type Dropdown */}
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select Type</option>
        <option value="hotel">🏨 Hotel</option>
        <option value="restaurants">🍽️ Restaurant</option>
      </select>

      {/* Min Price Input */}
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Min Price"
        className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Max Price Input */}
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Max Price"
        className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Apply Filters
      </button>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;
