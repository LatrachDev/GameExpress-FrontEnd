import React from 'react';
import axios from 'axios';

const AddToCartButton = ({ productId, quantity = 1 }) => {
  const handleAddToCart = () => {
    axios.post('http://localhost:8000/api/cart', {
      product_id: productId,
      quantity: quantity
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // If using auth
      }
    })
    .then(response => {
      console.log('Product added to cart:', response.data);
      // You can add toast notification or feedback here
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
