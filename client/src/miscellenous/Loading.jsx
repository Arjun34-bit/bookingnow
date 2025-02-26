import React from "react";

const LoadingBar = () => {
  return (
    <div className="w-full h-2 bg-gray-300 rounded-md overflow-hidden">
      <div className="h-full bg-green-600 w-full animate-loading"></div>
    </div>
  );
};

export default LoadingBar;
