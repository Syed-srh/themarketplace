import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck, MapPin, ArrowLeft, ShoppingBag } from 'lucide-react';

const Waiting = ({ orders = [] }) => {
  const navigate = useNavigate();

  // Helper to format date with +6 days calculation
  const getDeliveryDetails = (orderDateString) => {
    const orderDate = orderDateString ? new Date(orderDateString) : new Date();
    
    // Add 6 days for estimated delivery date
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 6);

    const formatShort = (d) => {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const formatReadable = (d) => {
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const day = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const year = d.getFullYear();
      return `${dayName}, ${day} ${monthName} ${year}`;
    };

    return {
      orderFormatted: formatShort(orderDate),
      deliveryFormatted: formatShort(deliveryDate), // e.g. 02-09-2026
      deliveryReadable: formatReadable(deliveryDate) // e.g. Wed, 2 Sep 2026
    };
  };

  // If no orders
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-12 px-4 font-sans flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center max-w-md w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 border border-amber-100">
            <Clock size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Waiting Deliveries</h2>
          <p className="text-sm text-gray-500 mb-6">You don't have any active orders pending delivery right now.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#2874F0] hover:bg-blue-600 text-white font-bold text-sm px-8 py-2.5 rounded shadow transition cursor-pointer uppercase tracking-wide"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-6 px-4 font-sans text-gray-800">
      
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto mb-5 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200">
          <Clock size={16} className="text-amber-600" />
          <span>{orders.length} Active Delivery Waiting</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="text-blue-600" size={24} /> Waiting Deliveries ({orders.length})
          </h1>
          <span className="text-xs text-gray-500 font-medium">Track your ordered items & arrival status</span>
        </div>

        {/* List of Ordered Items */}
        {orders.map((item, index) => {
          const dates = getDeliveryDetails(item.orderDate);
          const rawPrice = Number(item?.price?.toString().replace(/,/g, '')) || 500;
          const itemImage = item?.images?.frontView || item?.image;

          return (
            <div key={`${item.orderId || index}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-left">
              
              {/* Top Banner with Dynamic 6-Day Delivery Date */}
              <div className="bg-gradient-to-r from-emerald-700 to-green-600 text-white px-5 py-3 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <Truck size={20} className="animate-pulse" />
                  <span className="font-bold text-sm sm:text-base">
                    Expected Delivery: <span className="underline">{dates.deliveryFormatted}</span> ({dates.deliveryReadable})
                  </span>
                </div>
                <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded backdrop-blur-sm">
                  Order ID: {item.orderId || `OD${1000000000 + index}`}
                </span>
              </div>

              <div className="p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                
                {/* Item Details */}
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 flex-shrink-0 border rounded p-1.5 bg-white flex items-center justify-center">
                    <img src={itemImage} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 capitalize font-medium">Category: {item.category || 'General'}</p>
                    <p className="text-base font-extrabold text-gray-900 mt-1.5">₹{rawPrice.toLocaleString('en-IN')}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Ordered on: <strong>{dates.orderFormatted}</strong></p>
                  </div>
                </div>

                {/* Progress Tracking Bar */}
                <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Order Placed ({dates.orderFormatted})
                    </span>
                    <span className="text-blue-700 font-bold">In Transit</span>
                    <span className="text-gray-400">Delivery ({dates.deliveryFormatted})</span>
                  </div>

                  {/* Visual Progress Line */}
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full w-2/3 rounded-full animate-pulse"></div>
                  </div>

                  <p className="text-[11px] text-gray-600 mt-1">
                    🚚 Item is packed and will reach your address by <strong className="text-emerald-700">{dates.deliveryFormatted}</strong>.
                  </p>
                </div>

              </div>

              {/* Delivery Address Summary Footer */}
              {item.address && (
                <div className="bg-gray-50 px-5 py-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-red-500" />
                    <span>Delivering to: <strong>{item.address.name || "Customer"}</strong> ({item.address.city || "Bengaluru"})</span>
                  </div>
                  <span className="text-emerald-700 font-bold">Standard Delivery (6 Days)</span>
                </div>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Waiting;
