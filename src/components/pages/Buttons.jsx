import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Buttons = ({ addToCart }) => {
  const navigate = useNavigate();
  const { category = "products", id = "1" } = useParams();

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ category, id });
    }
    navigate(`/addcart/${category}/${id}`);
  };

  const handleBuyNow = () => {
    navigate(`/payments/${category}/${id}`);
  };

  return ( 
    <div className='flex gap-4 w-full items-center mt-4'>
      <button 
        onClick={handleAddToCart} 
        className='p-3 rounded bg-white border border-gray-300 text-black text-lg w-1/2 font-bold cursor-pointer shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2'
      >
        Add to Cart
      </button>
      <button 
        onClick={handleBuyNow}
        className='rounded p-3 bg-[linear-gradient(90deg,rgb(255,229,31),rgb(255,180,0))] text-black text-lg w-1/2 font-bold cursor-pointer shadow-md hover:opacity-95 flex items-center justify-center gap-2'
      >
        Buy Now
      </button>
    </div>
  )
}

export default Buttons



