import React, { useState } from "react";
import VendorLogin from "../components/VendorLogin";
import VendorRegister from "../components/VendorRegister";

const Vendor = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "register"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === "login" ? <VendorLogin /> : <VendorRegister />}
        </div>
      </div>
    </div>
  );
};

export default Vendor;
