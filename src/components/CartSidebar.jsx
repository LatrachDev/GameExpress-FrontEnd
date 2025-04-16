import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { data } from 'react-router-dom';
import API_BASE_URL from '../api/Config';

const url = API_BASE_URL;

const CartSidebar = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.get("v2/client/cart/");
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
            // console.log("Cart response:", response);
        };

        fetchCart();
    }, [cartItems]);

    return (
        <div className={`text-black fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">My Cart</h2>
                <button onClick={onClose} className="text-red-500 text-xl font-bold">&times;</button>
            </div>
            <div className="p-4]">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="border-b py-2 text-black">
                    {console.log("Cart item:", item)}
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                        <p>Category: {item.product.category.name}</p>
                        <img
                                src={
                                    item.product.images && item.product.images.length > 0
                                        ? url + item.product.images[0].image_url
                                        : 'https://via.placeholder.com/300'
                                }
                                alt={item.product.name}
                                className="w-full h-48 object-cover"
                            />
                    </div>
                    ))
                  ) : (
                  <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
    // return (
    //     <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    //         <div className="p-4 border-b flex justify-between items-center">
    //             <h2 className="text-lg font-bold">My Cart</h2>
    //             <button onClick={onClose} className="text-red-500 text-xl font-bold">&times;</button>
    //         </div>
    //         <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
    //             {cartItems.length === 0 ? (
    //                 <p className="text-gray-500">Your cart is empty.</p>
    //             ) : (
    //                 cartItems.map((item, index) => (
    //                     <div key={index} className="border-b py-2">
    //                         <h4 className="font-semibold">{item.product}</h4>
    //                         <p>Quantity: {item.quantity}</p>
    //                         <p className="text-sm text-gray-600">After Fees: ${item.details.After_fees_price.toFixed(2)}</p>
    //                     </div>
    //                 ))
    //             )}
    //         </div>
    //     </div>
    // );
};

export default CartSidebar;
