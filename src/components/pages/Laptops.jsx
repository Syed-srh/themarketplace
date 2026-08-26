import React from "react";
import CardComp from "./CardComp";
import { Laptop } from "lucide-react";

const Laptops = ({ laptops }) => {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-200/80 gap-4 text-left">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-extrabold uppercase tracking-widest mb-1">
            <Laptop size={14} /> High Performance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Laptops & Computers
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Power through work, gaming, and creative tasks with modern processors.
          </p>
        </div>
        <div className="text-xs text-gray-500 font-bold bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs self-start sm:self-auto">
          Showing {laptops?.length || 0} Products
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {laptops?.map((product) => (
          <CardComp key={product.id} product={product} category="laptops" />
        ))}
      </div>
    </div>
  );
};

export default Laptops;
