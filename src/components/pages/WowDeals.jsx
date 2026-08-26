import { MoveRight } from 'lucide-react';
import React, { useState } from 'react';

export default function WowDealAccordion({currentProduct}) {
  const [isOpen, setIsOpen] = useState(true);

//   Converting the raw price
const rawPrice = Number(currentProduct?.price?.toString().replace(/,/g, '')) || 0;
// Now calculating the discount
 const discountedPrice = Math.round(rawPrice * 0.86).toLocaleString('en-IN');


  return ( <div className="w-full overflow-hidden rounded-2xl bg-[#1D58D8] shadow-lg font-sans my-4">
   
      {/* Accordion Blue Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#1D58D8] text-white focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {/* WOW! DEAL Tag */}
          <div className="bg-white text-black text-[10px] font-black italic px-1.5 py-0.5 rounded tracking-tighter leading-tight uppercase border border-black shadow-sm">
            WOW!<br />DEAL
          </div>
          <span className="font-semibold text-base tracking-wide">
            Apply offers for maximum savings
          </span>
        </div>
        
        {/* Chevron Indicator */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
        </svg>
      </button>

      {/* Accordion Body */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-3 bg-[#DDF1FF] rounded-b-2xl">
          {/* Discount Headline */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-1">
            Buy at ₹{discountedPrice}
          </h2>

          {/* Offer Section Inner Box */}
          {/* Responsive Row/Column for Bank Offers */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
  
  {/* Card 1: themarketplace Axis Credit */}
  <div className="relative w-full border border-gray-200 rounded-lg p-3.5 bg-white pt-4 shadow-sm">
    {/* Gold Highlight Badge */}
    <span className="absolute -top-2.5 left-2 bg-[#FEEFAD] text-[#694800] text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200">
      Best value for you
    </span>
    
    <div className="flex justify-between items-start mb-1">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-3 bg-gradient-to-r from-blue-900 to-indigo-700 rounded-sm" />
        <span className="font-bold text-base text-gray-900">₹14 off</span>
      </div>
      <button className="text-blue-600 font-bold text-xs hover:underline">
        Apply
      </button>
    </div>

    <p className="text-xs text-gray-600 font-medium text-left">themarketplace Axis</p>
    
    <div className="mt-2 pt-1 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-700 font-semibold">
      <span>Credit Card • Cashback</span>
      <span className="text-gray-400 flex items-center">
        <MoveRight size={18} strokeWidth={0.75} />
      </span>
    </div>
  </div>

  {/* Card 2: themarketplace Axis Debit */}
  <div className="relative w-full border border-gray-200 rounded-lg p-3.5 bg-white pt-4 shadow-sm">
    <div className="flex justify-between items-start mb-1">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-3 bg-gradient-to-r from-blue-900 to-indigo-700 rounded-sm" />
        <span className="font-bold text-base text-gray-900">₹14 off</span>
      </div>
      <button className="text-blue-600 font-bold text-xs hover:underline">
        Apply
      </button>
    </div>

    <p className="text-xs text-gray-600 font-medium text-left">themarketplace Axis</p>
    
    <div className="mt-2 pt-1 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-700 font-semibold">
      <span>Debit Card • Cashback</span>
      <span className="text-gray-400 flex items-center">
        <MoveRight size={18} strokeWidth={0.75} />
       </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}