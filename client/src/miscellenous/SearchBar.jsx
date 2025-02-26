import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getListingsByUser } from "../redux/listingReducer";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = `?name=${search}`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      navigate(location.pathname, { replace: true });
      dispatch(getListingsByUser({ query }));
      return;
    }
    dispatch(getListingsByUser({ query }));
  };

  return (
    <div className="flex justify-center items-center rounded-md overflow-hidden mt-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search listings..."
        className="px-3 py-2 w-64 text-gray-700 focus:outline-blue-700 border border-blue-400"
      />
      <button
        onClick={handleSearch}
        className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition "
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
