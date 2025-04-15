import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/axios';

const AddToCartButton = ({ productId }) => {
 

  const [quantity, setQuantity] = useState({product_id: productId, quantity: 1});

  const handleChange = (e) => {
    setQuantity({
      ...quantity,
      quantity: e.target.value
    });
  };

  function handleCard(e){
    e.preventDefault();
    const send = async ()=>{
      try {
        const updateQuantity = await api.post('v2/client/addtocart',quantity)
        console.log(updateQuantity)
      } catch(error){
        console.log(error);
      }
    }
    send();
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

export default AddToCartButton