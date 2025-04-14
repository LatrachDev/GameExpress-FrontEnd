import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../api/axios';

function AddCategory() {
    const  [show, setShow] = useState(false);
    const [name, setName] = useState({name : ''})
    const handleShow = ()=> setShow(true)
    const handleClose = ()=> setShow(false)
    function handleChange(e){
        const { value } = e.target;
        setName({ name: value });
    }
    async function  handleSubmit(){
            try{
             const data = await api.post("/v1/admin/categories",name);
             console.log(data)
            } catch (error){
                console.log(error)
            }
        handleClose()
    }

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Add a Category
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add A Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter product name"
                        autoFocus
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
</>
  )
}

export default AddCategory