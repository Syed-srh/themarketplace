import React, { useState } from 'react';
import marketplaceLogo from '../../images/themarketplaceLogo.png';
import { Dumbbell, Handbag, Laptop, Footprints, TabletSmartphone, ShoppingCart, Clock, LogOut, Search, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ cartItems = [], orders = [], onLogout }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("More");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search/${encodeURIComponent(search.trim())}`);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('authToken');
    }
    navigate('/login');
  };

  const options = ["Become a Seller", "Notifications Settings", "24 * 7 Customer Care"];

  const categories = [
    { label: "For you", path: "/products", icon: Handbag },
    { label: "Mobiles", path: "/mobiles", icon: TabletSmartphone },
    { label: "Laptops", path: "/laptops", icon: Laptop },
    { label: "Shoes", path: "/shoes", icon: Footprints },
    { label: "Gym Accessories", path: "/gym", icon: Dumbbell },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200/80 shadow-2xs sticky top-0 z-50 backdrop-blur-md bg-white/95">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => navigate('/products')} 
              className="h-14 w-36 sm:w-44 rounded-xl overflow-hidden p-1 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-center"
            >
              <img src={marketplaceLogo} alt="themarketplace Logo" className="h-full w-full object-contain" />
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-600 font-medium hover:text-blue-600 cursor-pointer transition">
              <MapPin size={16} className="text-blue-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block font-normal leading-tight">Deliver to</span>
                <span className="font-bold text-gray-800 text-xs">Select Location</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                className="w-full bg-gray-100/90 border border-gray-300/70 focus:border-blue-500 focus:bg-white text-gray-900 placeholder-gray-500 text-sm rounded-xl pl-11 pr-4 py-2.5 outline-none transition-all shadow-2xs focus:ring-2 focus:ring-blue-500/20"
                type="text"
                placeholder="Search for Products, Brands and More..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>

          {/* Actions & Menu */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* More Dropdown */}
            <div
              className="relative hidden sm:inline-block"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={(e) => {
                const next = e.relatedTarget;
                if (!e.currentTarget.contains(next)) setIsOpen(false);
              }}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                {selectedValue} <ChevronDown size={14} />
              </button>

              {isOpen && (
                <div className="absolute right-0 top-full pt-1 bg-white shadow-xl z-50 w-52 border border-gray-100 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      onClick={() => {
                        setSelectedValue(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => navigate('/addcart')} 
              className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-blue-600 px-3 py-2 rounded-xl hover:bg-blue-50/60 transition cursor-pointer relative"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              <span className="hidden sm:inline">Cart</span>
              {cartItems.length > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-xs">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Orders / Waiting Button */}
            {orders.length > 0 && (
              <button 
                onClick={() => navigate('/waiting')} 
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-3 py-1.5 rounded-xl transition cursor-pointer"
              >
                <Clock size={16} className="text-amber-600" />
                <span className="hidden sm:inline">Orders</span>
                <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-2xs">
                  {orders.length}
                </span>
              </button>
            )}

            {/* Logout Button */}
            <button 
              onClick={handleLogoutClick} 
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Categories Bar */}
      <div className="border-t border-gray-100 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-center sm:gap-10 overflow-x-auto py-2.5 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = location.pathname === cat.path;
              return (
                <button
                  key={cat.label}
                  onClick={() => navigate(cat.path)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-sm scale-105" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;