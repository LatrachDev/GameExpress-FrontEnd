import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios';
import API_BASE_URL from '../api/Config';
import { Box, CircularProgress } from '@mui/material';

function ShowProduct() {
const {id,user} = useParams();
const [product, setProduct] = useState({});
const [loading, setLoading] = useState(true);
const thumbnail = useRef(null);
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
},[id]) // Fetch data when the id changes
function handleClick(path){
    thumbnail.current.src = path;
}
if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }
return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
        {/* Left Section: Image Gallery */}
        <div className="md:w-1/2 p-4 flex flex-col items-center">
            {/* Main Image */}
            <div className="mb-4 w-full h-80 flex justify-center items-center overflow-hidden rounded-lg border border-gray-200">
            <img
                className="max-w-full max-h-full object-contain"
                src={API_BASE_URL + (product.images && product.images.length > 0 ? product.images[0]?.image_url : '/placeholder.png')} // Use placeholder if no images
                alt={product.name}
                ref={thumbnail}
            />
            </div>
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && ( // Only show thumbnails if more than one image
            <div className="flex space-x-2 overflow-x-auto p-2">
                {product.images.map((image, index) => (
                <div
                    key={image.id}
                    className={`w-16 h-16 flex-shrink-0 border-2 rounded cursor-pointer overflow-hidden ${
                    index === 0 ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'
                    }`}
                   
                >
                    <img
                    className="w-full h-full object-cover"
                    src={API_BASE_URL + image.image_url}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    onClick={()=> handleClick(API_BASE_URL + image.image_url)}
                    />
                </div>
                ))}
            </div>
            )}
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