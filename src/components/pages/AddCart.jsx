import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Bookmark, Zap, ShieldCheck, Info, X, Percent, ShoppingCart } from 'lucide-react';

const AddCart = ({ product1, mobile1, laptops1, shoes1, gym1, removeFromCart, addToCart, cartItems = [] }) => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // Track quantities for items: { "category-id": quantity }
  const [quantities, setQuantities] = useState({});
  const [warrantyAdded, setWarrantyAdded] = useState(false);

  // Map category name to dataset
  const datasets = {
    products: product1,
    mobiles: mobile1,
    laptops: laptops1,
    shoes: shoes1,
    gym: gym1
  };

  // Helper to find product details by item key
  const getItemDetails = (itemKey) => {
    const list = datasets[itemKey.category] || product1;
    const found = list?.find((item) => String(item.id) === String(itemKey.id));
    return {
      category: itemKey.category,
      id: itemKey.id,
      ...(found || list?.[0] || {})
    };
  };

  // Build current list of active items in cart
  const activeItems = cartItems.map(getItemDetails);

  // Handle quantity change
  const handleQtyChange = (itemKey, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [`${itemKey.category}-${itemKey.id}`]: Number(newQty)
    }));
  };

  const getQty = (itemKey) => {
    return quantities[`${itemKey.category}-${itemKey.id}`] || 1;
  };

  // Overall Price Calculations
  let totalOriginalPrice = 0;
  let totalDiscountedPrice = 0;

  activeItems.forEach((item) => {
    const q = getQty(item);
    const rawPrice = Number(item?.price?.toString().replace(/,/g, '')) || 500;
    const rawOldPrice = Number(item?.oldPrice?.toString().replace(/,/g, '')) || 4999;
    
    totalOriginalPrice += rawOldPrice * q;
    totalDiscountedPrice += rawPrice * q;
  });

  const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
  const platformFee = activeItems.length > 0 ? 9 : 0;
  const warrantyCost = warrantyAdded ? 49 : 0;
  const grandTotal = totalDiscountedPrice + platformFee + warrantyCost;
  const totalSavings = totalDiscount + (activeItems.length > 0 ? 100 : 0);

  const handlePlaceOrderFromCart = () => {
    if (activeItems.length > 0) {
      navigate(`/payments/${activeItems[0].category}/${activeItems[0].id}`);
    } else {
      navigate('/payments');
    }
  };

  // IF CART IS EMPTY -> SHOW EMPTY CART SCREEN MATCHING THE PHOTO
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-12 px-4 font-sans flex items-center justify-center">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-10 text-center max-w-3xl w-full flex flex-col items-center justify-center">
          
          {/* Cart Icon Illustration matching screenshot */}
          <div className="relative mb-6">
            <div className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100">
              <ShoppingCart size={56} className="text-gray-300 stroke-[1.2]" />
            </div>
            <div className="absolute top-2 right-4 bg-yellow-400 text-blue-700 text-[10px] font-black italic px-1.5 py-0.5 rounded border border-yellow-500 shadow-sm">
              F
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Missing Cart items?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Explore our wide range of products or continue where you left off.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="bg-[#2874F0] hover:bg-blue-600 text-white font-bold text-sm px-10 py-3 rounded shadow transition cursor-pointer uppercase tracking-wider"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // IF CART HAS ITEMS -> SHOW ALL ITEMS + PRICE SUMMARY
  return (
    <div className="bg-[#F1F3F6] min-h-screen py-6 px-4 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 items-start">
        
        {/* LEFT COLUMN - All Cart Items */}
        <div className="w-full lg:w-2/3 flex flex-col gap-3">
          
          {/* Saved Addresses Header Bar */}
          <div className="bg-white p-3.5 rounded shadow-sm flex justify-between items-center border border-gray-200">
            <span className="text-sm font-medium text-gray-700">From Saved Addresses</span>
            <button className="border border-blue-600 text-blue-600 px-3.5 py-1 text-sm font-semibold rounded hover:bg-blue-50 transition cursor-pointer">
              Enter Delivery Pincode
            </button>
          </div>

          {/* Render Each Item in Cart */}
          {activeItems.map((item, index) => {
            const itemQty = getQty(item);
            const rawPrice = Number(item?.price?.toString().replace(/,/g, '')) || 500;
            const rawOldPrice = Number(item?.oldPrice?.toString().replace(/,/g, '')) || 4999;
            const itemTotalPrice = rawPrice * itemQty;
            const itemTotalOldPrice = rawOldPrice * itemQty;
            const itemImage = item?.images?.frontView || item?.image;

            return (
              <div key={`${item.category}-${item.id}-${index}`} className="bg-white rounded p-4 shadow-sm border border-gray-200 flex flex-col gap-4">
                
                {/* Green Tag */}
                <div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded font-semibold border border-emerald-100">
                    Lowest Price since Launch
                  </span>
                </div>

                {/* Product Info Row */}
                <div className="flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center p-1 border rounded bg-white">
                    <img src={itemImage} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-left">
                    <h2 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{item.category} • True Quality</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="bg-green-700 text-white text-xs px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                        {item.rating} ★
                      </span>
                      <span className="text-xs text-gray-500 font-medium">({item.reviews})</span>
                    </div>

                    {/* Qty & Price Row */}
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <div className="flex items-center text-xs font-semibold gap-1">
                        <span>Qty:</span>
                        <select 
                          value={itemQty} 
                          onChange={(e) => handleQtyChange(item, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 bg-gray-50 text-xs font-bold cursor-pointer outline-none"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-emerald-700 text-xs font-bold flex items-center">
                          ↓{item.discount}%
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{itemTotalOldPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{itemTotalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-2 font-medium">
                      Delivery by <span className="font-bold text-gray-800">Sat Aug 29</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex border-t border-gray-100 pt-3 justify-between sm:justify-start sm:gap-8 text-xs sm:text-sm font-bold text-gray-700">
                  <button className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer">
                    <Bookmark size={15} />
                    <span>Save for later</span>
                  </button>
                  
                  {/* Remove Button -> Decreases Cart Badge Count */}
                  <button 
                    onClick={() => removeFromCart && removeFromCart({ category: item.category, id: item.id })} 
                    className="flex items-center gap-1.5 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={15} />
                    <span>Remove</span>
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer">
                    <Zap size={15} />
                    <span>Buy this now</span>
                  </button>
                </div>

              </div>
            );
          })}

          {/* Extended Warranty Section */}
          <div className="bg-white rounded p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-gray-800">Extended Warranty Plan by OneAssist</h3>
              {/* <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={16} />
              </button> */}
            </div>

            <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  Syed
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800">Extended Warranty Plan</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">₹49 • 1 Year</p>
                </div>
              </div>
              
              <button 
                onClick={() => setWarrantyAdded(!warrantyAdded)}
                className={`px-5 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                  warrantyAdded 
                    ? "bg-green-600 text-white" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {warrantyAdded ? "Added ✓" : "Add"}
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Price Details & Order Summary */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          
          {/* Price Details Panel */}
          <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <h3 className="text-gray-500 font-bold uppercase text-xs px-4 py-3 border-b border-gray-100 tracking-wider text-left">
              Price Details
            </h3>

            <div className="p-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Price ({activeItems.length} item{activeItems.length > 1 ? 's' : ''})</span>
                <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span className="text-emerald-600 font-semibold">- ₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Coupons for you</span>
                <span className="text-emerald-600 font-semibold">- ₹100</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              {warrantyAdded && (
                <div className="flex justify-between text-gray-700">
                  <span>Extended Warranty</span>
                  <span>₹49</span>
                </div>
              )}

              <div className="border-t border-dashed border-gray-200 my-1"></div>

              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Savings Highlight */}
              <div className="bg-emerald-50 text-emerald-700 font-semibold p-2.5 rounded text-xs flex items-center gap-1.5 border border-emerald-100 mt-1">
                <Percent size={14} className="bg-emerald-600 text-white p-0.5 rounded-full" />
                <span>You'll save ₹{totalSavings.toLocaleString('en-IN')} on this order!</span>
              </div>
            </div>
          </div>

          {/* Secure Payment Guarantee */}
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium px-2 py-1">
            <ShieldCheck size={28} className="text-gray-400 flex-shrink-0" />
            <p className="text-left leading-tight">
              Safe and secure payments. Easy returns. 100% Authentic products.
            </p>
          </div>

          {/* Bottom Sticky / Order Button Bar */}
          <div className="bg-white p-4 shadow-md rounded border border-gray-200 flex justify-between items-center">
            <div className="text-left">
              <span className="text-xs text-gray-400 line-through mr-1.5">
                ₹{totalOriginalPrice.toLocaleString('en-IN')}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-gray-900">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
                <Info size={14} className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            <button 
              onClick={handlePlaceOrderFromCart}
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-7 py-3 rounded text-sm shadow cursor-pointer transition uppercase tracking-wide"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AddCart;
