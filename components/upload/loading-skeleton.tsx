import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex flex-col h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] bg-gray-100 rounded-3xl border border-gray-500/10 shadow-2xl">
      <div className="h-2 bg-gray-200 rounded-full mt-4 mx-4"></div>
      <div className="flex flex-col gap-4 p-4">
        <div className="h-8 bg-gray-200 rounded-md w-64"></div>
        <div className="h-12 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md w-48"></div>
      </div>
    </div>
  );
}
