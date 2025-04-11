import React, { useEffect, useState } from 'react'
import { useCategory } from '../context/CategoryContext'

function Categories() {
    // const [categories, setCategories] = useState()
    const {fetchCategories , categories} = useCategory();
    useEffect(()=>{
      fetchCategories();
    },[])
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Categories</h1>
      <ul className="space-y-4">
        {categories && categories.categries && categories.categries.length > 0 ? (
          categories.categries.map((category, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <span className="text-lg font-medium text-gray-700">{category.name}</span>
              <div className="flex space-x-3">
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="text-green-500 hover:text-green-700 transition-colors"
                  title="Update"
                >
                  <i className="fas fa-sync-alt"></i>
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </ul>
    </div>
  );
}

export default Categories