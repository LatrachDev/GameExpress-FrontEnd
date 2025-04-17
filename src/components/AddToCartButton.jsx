import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AddToCartButton = ({ productId }) => {
 
  const {isAuthenticated}= useAuth()
  const [quantity, setQuantity] = useState({product_id: productId, quantity: 1});

  const handleChange = (e) => {
    setQuantity({
      ...quantity,
      quantity: e.target.value
    });
  };
// check if there is items in storage
useEffect(()=>{
  if (isAuthenticated){
    let cartLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartLocalStorage){
    for(let i = 0; i < cartLocalStorage.length; i++){ 
      const item = {product_id: cartLocalStorage[i].product_id , quantity:  parseInt(cartLocalStorage[i].quantity)}
      console.log(item)
      const send = async ()=>{
        try {
          const updateQuantity = await api.post('v2/client/addtocart',item)
          console.log(updateQuantity)
        } catch(error){
          console.log(error);
        }
      }
      send();
    }
    localStorage.removeItem("cart");
  }
  }
},[isAuthenticated])
  function handleCard(e){
    e.preventDefault();
   if (isAuthenticated){
    const send = async ()=>{
      try {
        const updateQuantity = await api.post('v2/client/addtocart',quantity)
        console.log(updateQuantity)
      } catch(error){
        console.log(error);
      }
    }
    send();

   } else {
   let cart =JSON.parse(localStorage.getItem("cart")) || [] ;
    cart.push(quantity)
    localStorage.setItem("cart",JSON.stringify(cart));
    console.log("Added to local cart");
   }
  }
  return (
    <>
      <form className="flex flex-col sm:flex-row gap-2 items-center justify-center py-2">
        <input 
          type="number" 
          min="1" 
          value={quantity.quantity}
          onChange={handleChange}
          className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 text-center" 
        />
        <button 
         onClick={handleCard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
          <i className="fas fa-shopping-cart"></i>
        </button>
      </form>
    </>
  );
};
export default AddToCartButton;