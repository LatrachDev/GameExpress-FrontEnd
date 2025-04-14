import React, { useEffect, useState } from 'react'
import { useCategory } from '../context/CategoryContext'
import AddCategory from '../components/AddCategory';
import UpdateCategory from '../components/UpdateCategory';
import DeleteCategory from '../components/DeleteCategory';

function Categories() {
    // const [categories, setCategories] = useState()
    const {fetchCategories , categories} = useCategory();
    useEffect(()=>{
      fetchCategories();
    },[categories])
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Categories</h1>
      <AddCategory/>
      <ul className="space-y-4 my-4">
        {categories && categories.categries && categories.categries.length > 0 ? (
          categories.categries.map((category, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <span className="text-lg font-medium text-gray-700">{category.name}</span>
              <div className="flex space-x-3">
               <DeleteCategory id={category.id}/>
               <span className='px-2'></span>
                <UpdateCategory id={category.id}/>
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