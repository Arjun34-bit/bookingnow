import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg text-gray-600 font-semibold">Loading...</p>
    </div>
  );
};

export default LoadingPage;
