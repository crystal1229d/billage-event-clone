import React from 'react';

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  );
};
