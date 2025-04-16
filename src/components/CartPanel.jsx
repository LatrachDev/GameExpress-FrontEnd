import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartSidebar from './CartSidebar';

const CartPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setIsOpen(!isOpen);



  useEffect(() => {
    if (isOpen) {
    
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleCart}
        className=" bg-white text-black px-4 py-2 rounded z-50"
      >
        🛒 Cart
      </button>

      <CartSidebar isOpen={isOpen} cartItems={cartItems} onClose={toggleCart} />
    </>
  );
};

export default CartPanel;
