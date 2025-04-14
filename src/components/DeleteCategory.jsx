import React from 'react'
import { Button } from 'react-bootstrap';
import api from '../api/axios';

function DeleteCategory({id}) {
   async function deleteCategory(id){
        try {
        const { data } = await api.delete('v1/admin/categories/'+id);
       
        } catch (error){
            console.log("failed to fetch");
        }
    }

  return (
    <Button variant="warning" onClick={()=>deleteCategory(id)}>
            <i className="fas fa-trash"></i>
    </Button>
  )
}

export default DeleteCategory