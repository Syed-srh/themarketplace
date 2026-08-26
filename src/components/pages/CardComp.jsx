import React from "react";

const CardComp = ({ product, category="products" }) => {
  const handleCardClick = () => {
    window.open(`/cartpayment/${category}/${product.id}`, '_blank');
  };

  return (
    <div 
      key={product.id} 
      className="bg-gray-50 rounded p-4 cursor-pointer" 
      onClick={handleCardClick}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button 
          className="wishlist" 
          onClick={(e) => e.stopPropagation()} // Prevents wishlist click from triggering tab open
        >
          ♡
        </button>
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>

        <div className="rating-section">
          <span className="rating">{product.rating} ★</span>
          <span className="reviews">({product.reviews})</span>
        </div>

        <div className="price-section">
          <span className="price">₹{product.price}</span>
          <span className="old-price">₹{product.oldPrice}</span>
          <span className="discount">{product.discount}% off</span>
        </div>

        <p className="bank-offer">Bank Offer</p>
      </div>
    </div>
  );
};

export default CardComp;
