import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import api from '../api/axios';
import { useCategory } from '../context/CategoryContext';

function UpdateProduct({productId}) {
    const [show, setShow] = useState(false);
    const { fetchCategories,categories} = useCategory();
    const [formData, setFormData] = useState({
        _method : 'put',
        name: '',
        slug: '',
        price: '',
        stock: '',
        category_id: '',
        images: [],
        
    });
       useEffect(()=>{
            fetchCategories();
            if (categories && categories.categries.length > 0){
                console.log(categories.categries)
            }
        }, [categories])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: Array.from(files),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('slug', formData.slug);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('category_id', formData.category_id);

        formData.images.forEach((file, index) => {
            data.append(`images[${index}]`, file);
        });
        for (const key in formData) {
            if (key !== 'images') {
            data.append(key, formData[key]);
            }
        }
console.log(formData)
        try {
            const update = await api.post("/v1/admin/products/"+productId, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Accept" : "application/json",
                },
            });
            console.log(update);
        } catch (error) {
            console.log(error.response?.data);
        }

        handleClose();
    };

    return (
        <>
            {/* <Button variant="warning" onClick={handleShow}>
                Update Product
            </Button> */}
            <button className="text-yellow-500 hover:text-yellow-700" onClick={handleShow} >
            <i className="fas fa-pen"></i> update
        </button>  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSlug">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="Enter slug"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Enter stock quantity"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryId">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {/* <div>{console.log(categories)}</div> */}
                            {(categories && categories.categries.length > 0) ? 
                            
                                categories.categries.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            : null}
                        </Form.Select>
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control
                                type="file"
                                name="images"
                                onChange={handleChange}
                                multiple // Allow multiple file selection
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
    );
}

export default UpdateProduct;