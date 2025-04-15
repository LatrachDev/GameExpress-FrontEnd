import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartSidebar from './CartSidebar';

const CartPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setIsOpen(!isOpen);

  const fetchCart = () => {
    axios.get('http://localhost:8000/api/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setCartItems(response.data))
    .catch(error => console.error('Error fetching cart:', error));
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded z-50"
      >
        🛒 Cart
      </button>

      <CartSidebar isOpen={isOpen} cartItems={cartItems} onClose={toggleCart} />
    </>
  );
};

export default CartPanel;
