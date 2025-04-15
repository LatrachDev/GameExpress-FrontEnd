import React from 'react';

const CartSidebar = ({ isOpen, cartItems, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">My Cart</h2>
        <button onClick={onClose} className="text-red-500 text-xl font-bold">&times;</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="border-b py-2">
              <h4 className="font-semibold">{item.product}</h4>
              <p>Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600">After Fees: ${item.details.After_fees_price.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
