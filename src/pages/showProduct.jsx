import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios';
import API_BASE_URL from '../api/Config';
import { Box, CircularProgress } from '@mui/material';

function ShowProduct() {
const {id,user} = useParams();
const [product, setProduct] = useState({});
const [loading, setLoading] = useState(true);
useEffect(()=>{
   const data = async ()=>{
    try{
        const {data} = await api.get("v1/admin/products/"+id);
    setProduct(data.product);
    } catch (error){
        console.log("failed to fetch data");
    } finally{
        setLoading(false);
    }
   }
   data();
},[product])
if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }
return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
        {/* Left Section: Image */}
        <div className="md:w-1/2">
            <img
                className="w-full h-full object-cover"
                src={API_BASE_URL + product.images[0]?.image_url}
                alt={product.name}
            />
        </div>

        {/* Right Section: Product Info */}
        <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <div className="mt-6">
                <span className="text-xl font-semibold text-gray-800">Price: ${product.price}</span>
            </div>
            <div className="mt-2">
                <span className="text-sm text-gray-600">Stock: {product.stock}</span>
            </div>
            <div className="mt-2">
                <span className="text-sm text-gray-600">Status: {product.status}</span>
            </div>
            <div className="mt-2">
                <span className="text-sm text-gray-600">Category: {product.category?.name}</span>
            </div>
           
        </div>
    </div>
);
}

export default ShowProduct