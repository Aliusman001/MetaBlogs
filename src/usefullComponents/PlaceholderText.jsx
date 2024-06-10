import React from "react";

function PlaceholderText() {
  return (
    <div role="status" className="max-w-full animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default PlaceholderText;
