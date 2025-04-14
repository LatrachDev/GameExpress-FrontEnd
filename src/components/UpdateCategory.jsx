import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../api/axios';

function UpdateCategory({id}) {
    const  [show, setShow] = useState(false);
    const [name, setName] = useState({_method:'put',name : ''})
    const handleShow = ()=> setShow(true)
    const handleClose = ()=> setShow(false)
    function handleChange(e){
        const { value } = e.target;
        setName({_method:'put', name: value });
    }
    async function  handleSubmit(){
            try{
             const data = await api.post("/v1/admin/categories/" + id,name,{
                'Content-Type': 'multipart/form-data',
                "Accept" : "application/json",
             });
            } catch (error){
                console.log(error)
            }
        handleClose()
    }

return (
    <>
    <Button variant="primary" onClick={handleShow}>
            <i className="fas fa-edit"></i>
    </Button>

    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                    <Modal.Title>Update A Category</Modal.Title>
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

export default UpdateCategory