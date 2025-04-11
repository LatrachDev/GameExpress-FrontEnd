import React from 'react'
import { useProductShow } from '../context/showProductContext'

function showProduct() {
    

return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/150"
            alt="Product"
        />
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Product Name</h2>
            <p className="text-gray-600 mt-2">This is a short description of the product.</p>
            <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-semibold text-gray-800">$99.99</span>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
)
}

export default showProduct