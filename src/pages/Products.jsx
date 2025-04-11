import { useEffect, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, CircularProgress, CardMedia } from '@mui/material';
import { AttachMoney, Category } from '@mui/icons-material';
import api from '../api/axios';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {fetchProducts, products,deleteProduct,fetchProduct} = useProducts();
    useEffect(()=>{
        fetchProducts();
        console.log(products);
    },[])
    const url = `http://127.0.0.1:8000`;
  function handleDelete(id){
    deleteProduct(id);
  }
//   show products 
function handleProduct(id){
    fetchProduct(id);
}

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        
                    >
                        <img
                            src={url + product.images[0].image_url || 'https://via.placeholder.com/300'}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 onClick={()=> handleProduct(product.id)} className="cursor-pointer text-lg font-semibold text-gray-800 text-center mb-2">
                                {product.name}
                            </h2>
                            <p className="text-gray-600 text-sm mb-1">
                                <strong>Price:</strong> ${product.price}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                                <strong>Stock:</strong> {product.stock}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Category:</strong> {product.category_id}
                            </p>
                            <div className="flex justify-center mt-4 space-x-4"></div>
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => console.log('Update product', product.id)}
                                >
                                    <i className="fas fa-edit"></i> Update
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                  
                ))}
            </div>
        </div>
    );
};

export default Products;