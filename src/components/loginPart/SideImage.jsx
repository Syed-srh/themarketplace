import React from 'react';
import marketplaceLogo from "../../images/themarketplaceLogo.png";
import { ShieldCheck, ShoppingBag } from 'lucide-react';

const SideImage = () => {
  return (
    <div className="w-full md:w-2/5 bg-gradient-to-b from-[#2874F0] to-[#1D5BBF] text-white p-8 sm:p-10 flex flex-col justify-between rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none min-h-[420px] text-left relative overflow-hidden shadow-inner">
      
      {/* Top Header Text */}
      <div> 
        <div className="flex items-center gap-2 text-yellow-300 text-xs font-extrabold uppercase tracking-widest mb-3">
          <ShoppingBag size={16} /> themarketplace eCommerce
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
          Login
        </h2> 
        <p className="text-blue-100 text-sm mt-3 leading-relaxed font-normal">
          Get access to your Orders, Cart, Wishlist, and Personalized Recommendations.
        </p>
      </div>

      {/* Decorative Brand Illustration Section */}
      <div className="my-6 flex flex-col items-center justify-center relative">
        <div className="w-36 h-36 bg-white/10 rounded-full flex items-center justify-center p-4 backdrop-blur-sm border border-white/20 shadow-lg">
          <img 
            className="max-h-full max-w-full object-contain filter drop-shadow-md" 
            src={marketplaceLogo} 
            alt="themarketplace Brand" 
          />
        </div>
      </div>

      {/* Footer Assurance Tag */}
      <div className="flex items-center gap-2 text-xs text-blue-100/90 border-t border-white/15 pt-4">
        <ShieldCheck size={18} className="text-yellow-300 flex-shrink-0" />
        <span>100% Safe & Secure Genuine Shopping</span>
      </div>

    </div>
  );
};

export default SideImage;
