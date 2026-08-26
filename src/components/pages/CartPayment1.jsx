import React from 'react';
import { useParams } from 'react-router-dom';

const CartPayment1 = ({ product1, mobile1, laptops1, shoes1, gym1 }) => {
  const { category, id } = useParams(); // e.g. category = "mobiles", id = "1"

  // Map category name to the dataset
  const datasets = {
    products: product1,
    mobiles: mobile1,
    laptops: laptops1,
    shoes: shoes1,
    gym: gym1
  };

  const selectedList = datasets[category] || product1;
  const currentProduct = selectedList?.find((item) => String(item.id) === String(id));

  if (!currentProduct) {
    return <div className="p-8 text-center text-xl font-bold">Product not found for ID: {id}</div>;
  }

  const imageViews = Object.values(currentProduct.images);

  return (
    <div className="p-6 w-1/2">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imageViews.map((url, index) => (
          <div key={index} className="cardPayment-image border rounded p-2 bg-white shadow-sm">
            <img src={url} alt={`View ${index + 1}`} className="w-full h-48 object-cover rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPayment1;
