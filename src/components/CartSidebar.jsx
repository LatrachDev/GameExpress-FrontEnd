import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { data } from 'react-router-dom';
import API_BASE_URL from '../api/Config';

const url = API_BASE_URL;

const CartSidebar = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const response = await api.get("v2/client/cart/");
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
                // console.log("Cart response:", response);
            } else {
                const localCart = localStorage.getItem("guestCart");
                console.log("Local cart for guest :", localCart);
                if (localCart) {
                    setCartItems(JSON.parse(localCart));
                } else {
                    setCartItems([]);
                }
            }
        };

        fetchCart();
    }, []);

    const handleRemoveItem = async(itemId) => {
        try {
            await api.delete(`v2/client/cart/${itemId}/`);
            setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('error removing item from cart: ', error);
        }
    }

    return (
        <div className={`fixed top-0 right-0 w-96 h-full bg-white shadow-xl transition-all duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-blue-500">
                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                <button 
                    onClick={onClose} 
                    className="text-white hover:text-gray-700 text-4xl transition-colors"
                >
                    &times;
                </button>
            </div>
            
            <div className="overflow-y-auto text-black h-[calc(100%-120px)]">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            {console.log("Cart item:", item)}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <img
                                        src={
                                            item.product.images && item.product.images.length > 0
                                                ? url + item.product.images[0].image_url
                                                : 'https://via.placeholder.com/300'
                                        }
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                                    <p className="text-sm text-gray-500">{item.product.category.name}</p>
                                    <div className="-mt-2 flex justify-between items-center">
                                        <p className="text-gray-700">Qty: {item.quantity}</p>
                                        <p className="font-medium text-gray-900">${item.price}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700  border-l-2 pl-2 text-sm font-medium"
                                >
                                    Remove
                                </button>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-16 w-16 text-gray-300 mb-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1} 
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                            />
                        </svg>
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                        <p className="text-gray-400 text-sm mt-1">Start adding some items</p>
                    </div>
                )}
            </div>
            
            {cartItems.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <div className="flex justify-between mb-4">
                        <span className="font-medium text-gray-700">Subtotal</span>
                        <span className="font-bold text-gray-900">
                            {/* ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} */}
                            ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                        </span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;