import React from 'react';
import { useParams } from 'react-router-dom';
import WowDealAccordion from './WowDeals';
import Buttons from './Buttons';

const CartPayment2 = ({ product1, mobile1, laptops1, shoes1, gym1, addToCart }) => {
  const { category, id } = useParams(); // Extract category & id from URL

  const datasets = {
    products: product1,
    mobiles: mobile1,
    laptops: laptops1,
    shoes: shoes1,
    gym: gym1
  };

  const selectedList = datasets[category] || product1;
  const currentProduct = selectedList?.find((item) => String(item.id) === String(id));

  return (
    <div className="w-1/2 p-6">
      <h3 className="text-lg font-semibold mb-2 text-start">
        {currentProduct.name}
      </h3>
      {currentProduct && (
        <div className="mt-4 flex flex-col gap-2 items-start">
          <p className="text-2xl font-bold text-green-600">₹{currentProduct.price}</p>
          <p className="text-gray-500 line-through">MRP: ₹{currentProduct.oldPrice}</p>
          <p className="text-lg text-green-700 font-semibold">{currentProduct.discount}% Off</p>
          <p className="text-md bg-green-200 text-green-800 w-fit px-2 py-1 rounded">
            Rating: {currentProduct.rating} ★ ({currentProduct.reviews} reviews)
          </p>
        </div>
      )}
      <WowDealAccordion currentProduct={currentProduct} />
      <Buttons addToCart={addToCart} />
    </div>
  );
};

export default CartPayment2;

