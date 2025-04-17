import { useEffect, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, CircularProgress, CardMedia } from '@mui/material';
import { AttachMoney, Category } from '@mui/icons-material';
import api from '../api/axios';
import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api/Config';
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import AddToCartButton from '../components/AddToCartButton';

const UserProducts = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {fetchProducts, products} = useProducts();
    
    useEffect(()=>{
        fetchProducts();
    },[products])
    
    const url = API_BASE_URL;

  
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Products</h1>
          {products.length < 1 ? (
            <div className="text-center py-8 text-gray-500 text-lg">No available products</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                product.stock > 0 && (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="relative">
                      <img
                        src={url + product.images[0]?.image_url || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-56 object-cover hover:opacity-90 transition-opacity"
                      />
                      {product.stock > 0 && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          In Stock
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <Link
                        to={`${product.id}`}
                        className="block text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2 transition-colors line-clamp-2"
                        title={product.name}
                      >
                        {product.name}
                      </Link>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500">
                          {product.stock} left
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {product.category_id}
                      </div>
                      
                      <AddToCartButton 
                        productId={product.id}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      />
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      );
};

export default UserProducts;