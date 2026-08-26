import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardComp from './CardComp';
import { SearchX, ArrowLeft, ShoppingBag } from 'lucide-react';

const SearchResults = ({ products = [], mobiles = [], laptops = [], shoes = [], gym = [] }) => {
  const { query = "" } = useParams();
  const navigate = useNavigate();

  const decodedQuery = decodeURIComponent(query).trim().toLowerCase();

  // Combine all datasets with their category names
  const allProducts = [
    ...(products || []).map(p => ({ ...p, categoryName: 'products' })),
    ...(mobiles || []).map(p => ({ ...p, categoryName: 'mobiles' })),
    ...(laptops || []).map(p => ({ ...p, categoryName: 'laptops' })),
    ...(shoes || []).map(p => ({ ...p, categoryName: 'shoes' })),
    ...(gym || []).map(p => ({ ...p, categoryName: 'gym' }))
  ];

  // Filter products by matching name or category
  const searchResults = allProducts.filter((product) => {
    const nameMatch = product?.name?.toLowerCase().includes(decodedQuery);
    const categoryMatch = product?.categoryName?.toLowerCase().includes(decodedQuery);
    return nameMatch || categoryMatch;
  });

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-6 px-4 font-sans text-gray-800">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto mb-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/products')} 
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft size={18} /> Back to Products
        </button>
        <span className="text-xs text-gray-500 font-medium">
          Search Query: <strong className="text-gray-800 font-bold">"{query}"</strong>
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* IF MATCHING PRODUCTS FOUND */}
        {searchResults.length > 0 ? (
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex justify-between items-center text-left">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Search Results for "{query}"
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Showing {searchResults.length} product{searchResults.length > 1 ? 's' : ''} matching your search
                </p>
              </div>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                {searchResults.length} Found
              </span>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((product, index) => (
                <CardComp 
                  key={`${product.categoryName}-${product.id}-${index}`} 
                  product={product} 
                  category={product.categoryName} 
                />
              ))}
            </div>
          </div>
        ) : (
          /* IF NO MATCHING PRODUCTS FOUND -> OOPS NOT AVAILABLE SCREEN */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center my-6 flex flex-col items-center justify-center max-w-3xl mx-auto">
            
            {/* Search Not Found Illustration */}
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5 border border-red-100">
              <SearchX size={52} className="stroke-[1.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Oops! Item Not Available
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
              We couldn't find any products matching <span className="font-bold text-gray-800">"{query}"</span>. Please check your spelling or search for another item.
            </p>

            {/* Suggested Search Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs font-semibold text-gray-600">
              <span className="text-gray-400">Popular Categories:</span>
              <button onClick={() => navigate('/mobiles')} className="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-full cursor-pointer transition">Mobiles</button>
              <button onClick={() => navigate('/laptops')} className="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-full cursor-pointer transition">Laptops</button>
              <button onClick={() => navigate('/shoes')} className="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-full cursor-pointer transition">Shoes</button>
              <button onClick={() => navigate('/gym')} className="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-full cursor-pointer transition">Gym Equipment</button>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="bg-[#2874F0] hover:bg-blue-600 text-white font-bold text-sm px-10 py-3 rounded-md shadow transition cursor-pointer uppercase tracking-wider flex items-center gap-2"
            >
              <ShoppingBag size={18} /> View All Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchResults;
