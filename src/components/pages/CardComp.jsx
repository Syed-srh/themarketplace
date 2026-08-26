import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Tag, ArrowRight } from "lucide-react";

const CardComp = ({ product, category = "products" }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/cartpayment/${category}/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className="group relative bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-3 left-3 z-10 bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
          {product.discount}% OFF
        </span>
      )}

      {/* Wishlist Heart Button */}
      <button 
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
          isWishlisted 
            ? "bg-rose-50 text-rose-500 border border-rose-200 scale-110" 
            : "bg-white/80 text-gray-400 hover:text-rose-500 hover:bg-white border border-gray-100"
        }`}
        onClick={handleWishlistClick}
        aria-label="Wishlist"
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.2} />
      </button>

      {/* Product Image Container */}
      <div className="relative w-full h-56 bg-gradient-to-b from-gray-50 to-gray-100/50 p-4 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out filter drop-shadow-sm" 
        />
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between text-left">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
              {product.rating} <Star size={11} fill="currentColor" />
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviews} reviews)
            </span>
          </div>
        </div>

        <div>
          {/* Price Section */}
          <div className="flex items-baseline gap-2 mt-3 pt-2 border-t border-gray-100">
            <span className="text-lg font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through font-medium">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          {/* Bank Offer Badge */}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
              <Tag size={11} className="flex-shrink-0" /> Bank Offer
            </span>
            <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              View <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComp;
