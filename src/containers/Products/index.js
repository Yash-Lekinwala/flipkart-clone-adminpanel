import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Sidebar from '../../components/Sidebar';
import Input from '../../components/UI/Input';

const initialState = {
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
};

const Products = () => {

    const [formData, setFormData] = useState(initialState);
    const [productImages, setProductImages] = useState([]);
    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('category', formData.category);
        form.append('price', formData.price);
        form.append('description', formData.description);
        form.append('quantity', formData.quantity);
        for(let pic of productImages)
        {
            form.append('productPicture', pic);
        }
        console.log(form);
        dispatch(addProduct(form));
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleImages = (e) => {
        setProductImages([...productImages, e.target.files[0]]);
    }
    console.log(productImages);

    const categoryList = (categories, options = []) => {
        for(let category of categories)
        {
            options.push({value: category._id, name: category.name})
            if(category.children.length > 0)
            {
                categoryList(category.children, options)
            }
        }
        return options;
    }

    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Product Pictures</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <Container fluid>
            <Row>
                <Sidebar />
                <Col md={10} style={{marginLeft: 'auto', paddingTop: '60px'}}>
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <h3>Products</h3>
                                <Button className="float-right" onClick={handleShow}>Add</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {renderProducts()}
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input 
                        type="text"
                        label="Product Name"
                        value={formData.name}
                        placeholder={`Enter Product`} 
                        handleChange={handleChange}
                        name="name"
                    />
                    <div className="form-group">
                        <label>Select Category</label>
                        <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                            <option>Select Category</option>
                            {
                                categoryList(category.categories).map((option) =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </div>
                    <Input 
                        type="text"
                        label="Price"
                        value={formData.price}
                        placeholder={`Enter Product Price`} 
                        handleChange={handleChange}
                        name="price"
                    />
                    <Input 
                        type="text"
                        label="Product Quantity"
                        value={formData.quantity}
                        placeholder={`Enter Product Quantity`} 
                        handleChange={handleChange}
                        name="quantity"
                    />
                    {
                        productImages.length > 0 ?
                        productImages.map((pic, index) => 
                            <div key={index}>
                                {pic.name}
                            </div>
                        )
                        : null
                    }
                    <div className="form-group">
                        <label>Product Pictures</label>
                        <input type="file" className="form-control" name="productPictures" onChange={handleImages} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" value={formData.description} rows={4} onChange={handleChange}>
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Products;