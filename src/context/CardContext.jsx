import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { Navigate, useNavigate } from 'react-router-dom';

const productContext = createContext();
export default function ProductProvider({children}) {
    const [loading, setLoading] = useState(true);
      const [products, setProducts] = useState([]);
      const [product, setProduct] = useState([]);
        const fetchProducts = async () => {
                try {
                    setLoading(true)
                const { data } = await api.get('v1/admin/products');
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        const deleteProduct = async(id)=>{
            try {
            const { data } = await api.delete('v1/admin/products/'+id);
                setProducts(newData => newData.filter(data => data.id != id))
              
            } catch (error){
                console.log("Failed to fetch");
            }
        }
      
        //    show a product 
    const fetchProduct = async(id) => {
        try{
            const {data} = await api.get("v1/admin/products/"+id)   
        setProduct(data.products)
            useNavigate("/product")
        console.log(product)
        } catch(error){
            console.log("failed to fetch")
        }
    }
     

  return (
    <productContext.Provider value={{ 
        fetchProducts,
        fetchProduct,
        deleteProduct,
        products
     }}>
    {children}
    </productContext.Provider>
  )
}

export const useProducts =()=> useContext(productContext);
