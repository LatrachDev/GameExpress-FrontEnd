import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
const CategoryContext = createContext();

export function CategoryProvider({children}) {
  const [categories, setCategories]= useState();
  const fetchCategories = async () => {
    const data = await api.get("v1/admin/categories"); 
    // console.log(data.data);
    setCategories(data.data);
  }
  return (
    <CategoryContext.Provider value={{
      fetchCategories,
      categories
    }}>{children}</CategoryContext.Provider>
  )
}

export const useCategory = ()=> useContext(CategoryContext)