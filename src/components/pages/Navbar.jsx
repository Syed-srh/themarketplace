import React, { useState } from 'react';
import marketplaceLogo from '../../images/themarketplaceLogo.png';
import { Dumbbell, Handbag, Laptop, Footprints, TabletSmartphone, ShoppingCart, Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartItems = [], orders = [], onLogout }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("More");


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

  const navigate = useNavigate();

  const handlesProductNavigate = () => {
    navigate('/products');
  }

  const handlesMobileNavigate = () => {
    navigate('/mobiles')
  }
   const handlesLaptopNavigate = () => {
    navigate('/laptops')
  }

  const handlesShoeNavigate = () => {
    navigate('/shoes')
  }

  const handleGymNavigate = () => {
    navigate('gym')
  }

  // // BackgroundColor added for the active element
  // const [activeCategory, setActiveCategory] = useState("For you");
  // const categories = ["For you", "Mobiles", "Laptops", "Shoes", "Gym Accessories"];
  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between py-5 px-3 items-center">
        <div className='w-44 h-24 bg-amber-300 rounded-2xl overflow-hidden'>
          <a href='#'>
            <img src={marketplaceLogo} alt='themarketplace Logo' className='w-full h-full object-cover' />
          </a>
        </div>

        <div>
          <a href='#' className='text-blue-600 font-bold flex gap-3 items-center text-lg'>
            Select the location
            <svg width='20' height='20' viewBox='0 0 17 17' fill='none'>
              <path
                d='m6.627 3.749 5 5-5 5'
                stroke='#1254E7'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Search and Navigation */}
      <div className="flex items-center justify-between w-full py-5 px-15">
        <div className='w-[60%]'>
          <form className='search-bar w-full' onSubmit={handleSearch}>
            <input
              className='border-gray-900 p-2 border-2 rounded-lg bg-gray-300 w-full outline-none'
              type='text'
              placeholder='Search for Products, Brands and More'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <div className='flex gap-10 justify-end items-center'>
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={(e) => {
              const next = e.relatedTarget;
              if (!e.currentTarget.contains(next)) {
                setIsOpen(false);
              }
            }}
          >
            <button className="dropdown-btn px-4 py-2 border-0 rounded-md">{selectedValue} ▼</button>

            {isOpen && (
              <div className="absolute left-0 top-full pt-2 bg-white shadow-md z-10 w-48 border rounded-md">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`block w-full px-3 py-2 text-left hover:bg-gray-100 ${option === "Logout" ? "text-red-600 font-bold border-t" : ""}`}
                    onClick={() => {
                      if (option === "Logout") {
                        handleLogoutClick();
                      } else {
                        setSelectedValue(option);
                      }
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <h4 
            onClick={() => navigate('/addcart')} 
            className='text-xl font-medium cursor-pointer flex gap-1.5 items-center hover:text-blue-600 transition'
          >
            Cart <ShoppingCart />
            {cartItems.length > 0 && (
              <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                {cartItems.length}
              </span>
            )}
          </h4>

          {orders.length > 0 && (
            <h4 
              onClick={() => navigate('/waiting')} 
              className='text-xl font-medium cursor-pointer flex gap-1.5 items-center text-amber-600 hover:text-amber-700 transition bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-sm'
            >
              Waiting <Clock size={20} className="text-amber-600" />
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                {orders.length}
              </span>
            </h4>
          )}

          <h4 
            onClick={handleLogoutClick} 
            className='text-xl font-medium cursor-pointer flex gap-1.5 items-center text-red-600 hover:text-red-700 transition ml-2 border border-red-200 bg-red-50 px-3 py-1 rounded-md'
          >
            Logout <LogOut size={20} />
          </h4>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-gray-200"></div>
      <div className="flex items-center justify-around py-6 px-5">

       


        <div className="card flex flex-col items-center" onClick={handlesProductNavigate}>
          <a href="#" className="flex flex-col items-center">
            <Handbag />
            <h4 className='font-bold mt-1'>For you</h4>
          </a>
        </div>
        <div className="card flex flex-col items-center" onClick={handlesMobileNavigate}>
          <a href="#" className="flex flex-col items-center">
            <TabletSmartphone />
            <h4 className='font-bold mt-1'>Mobiles</h4>
          </a>
        </div>
        <div className="card flex flex-col items-center" onClick={handlesLaptopNavigate}>
          <a href="#" className="flex flex-col items-center">
            <Laptop />
            <h4 className='font-bold mt-1'>Laptops</h4>
          </a>
        </div>
        <div className="card flex flex-col items-center" onClick={handlesShoeNavigate}>
          <a href="#" className="flex flex-col items-center">
            <Footprints />
            <h4 className='font-bold mt-1'>Shoes</h4>
          </a>
        </div>
        <div className="card flex flex-col items-center" onClick={handleGymNavigate}>
          <a href="#" className="flex flex-col items-center">
            <Dumbbell />
            <h4 className='font-bold mt-1'>Gym Accessories</h4>
          </a>
        </div>
      
      <div className="border-t border-gray-200"></div>
    </div>
    </div>
  );
};

export default Navbar;