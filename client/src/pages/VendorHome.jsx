import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBook,
  FiList,
  FiSettings,
} from "react-icons/fi";
import BookingHistory from "./BookingHistory";
import VendorListings from "./VendorListings";
import Dashboard from "./VendorDashboard";
import VendorDashboard from "./VendorDashboard";

import DropDown from "../miscellenous/DropDown";
import LoadingBar from "../miscellenous/Loading";
import { useSelector } from "react-redux";

const VendorHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const listings = useSelector((state) => state?.listing?.loading);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("tab"));
  }, [location.search]);

  const componentsMap = {
    bookings: <BookingHistory role={"vendor"} />,
    listings: <VendorListings />,
    dashboard: <VendorDashboard />,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative bg-gray-900 text-white w-64 space-y-6 py-7 px-2 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold text-center">BookingNow.com</h1>

        <nav className="mt-10">
          <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
            <FiHome /> <span>Dashboard</span>
          </div>
          <div
            onClick={() => navigate("/vendor/home/?tab=bookings")}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded"
          >
            <FiBook /> <span>Bookings</span>
          </div>
          <div
            onClick={() => navigate("/vendor/home/?tab=listings")}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded"
          >
            <FiList /> <span>Listings</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
            <FiSettings /> <span>Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white flex justify-between items-center px-5 py-3 shadow-md">
          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          <h2 className="text-xl font-semibold">Vendor's Panel</h2>
          <DropDown />
        </nav>
        {/* {listings ? <LoadingBar /> : ""} */}

        {/* Page Content */}
        <div className="p-6 overflow-auto h-full">
          {componentsMap[query] || <Dashboard />}
        </div>
      </div>
    </div>
  );
};

export default VendorHome;
