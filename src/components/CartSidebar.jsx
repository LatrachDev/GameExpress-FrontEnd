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
                const localCart = JSON.parse(localStorage.getItem("cart")) || [];   
                console.log("Local cart for guest :", localCart);
                const arrProducts = [];
                localCart.forEach(async (item) => {
                    console.log(item.product_id);
                    try {
                        const response = await api.get("v1/admin/products/" + item.product_id);
                        const productWithQuantity = { 
                            ...response.data, 
                            quantity: item.quantity, 
                            price: response.data.product.price * item.quantity 
                        };
                        // console.log(item.quantity);

                        arrProducts.push(productWithQuantity);
                        setCartItems([...arrProducts]);
                    } catch (error) {
                        console.error('Error fetching product details:', error);
                    }
                });
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
        <div className={`fixed top-0 right-0 w-96 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <div className="p-4 bg-black flex justify-between items-center text-white">
                <h2 className="text-2xl font-semibold">Shopping Cart</h2>
                <button
                    onClick={onClose}
                    className="text-white text-3xl leading-none hover:text-gray-300 transition"
                >
                    &times;
                </button>
            </div>
    
            {/* Cart Content */}
            <div className="overflow-y-auto h-[calc(100%-136px)] p-4 space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            {console.log(item)}
                            <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                <img
                                    src={
                                        item.product.images && item.product.images.length > 0
                                            ? url + item.product.images[0].image_url
                                            : 'https://via.placeholder.com/300'
                                    }
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h4 className="font-semibold text-black">{item.product.name}</h4>
                                <span className="text-sm text-gray-500 mb-1">{item.product.category.name}</span>
                                <div className="flex justify-between items-center text-sm text-gray-700">
                                    <span>Qty: {item.quantity}</span>
                                    <span>${item.product.price}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1 text-sm font-medium text-gray-900">
                                    <span>Total: ${item.price}</span>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-700 text-xs"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
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
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <p className="text-sm mt-1">Start adding some items</p>
                    </div>
                )}
            </div>
    
            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 shadow-inner">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 font-medium">Subtotal</span>
                        <span className="text-lg font-bold text-gray-900">
                            ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                        </span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
    
};

export default CartSidebar;