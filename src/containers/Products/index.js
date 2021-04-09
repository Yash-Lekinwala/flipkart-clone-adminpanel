import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import Input from '../../components/UI/Input';
import { FaEdit, FaEye } from "react-icons/fa";
import { addProduct } from '../../actions';

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
    const product = useSelector(state => state.product);
    const [show, setShow] = useState(false);
    const [productDetailsModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = () => {
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
    const handleClose = () => setShow(false);
    const handleCloseProductModal = () => setProductDetailModal(false);

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

    const showProductDetailsModal = (product) => {
        setProductDetailModal(true);
        setProductDetails(product);
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
                    <th>Category</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {product.products.length > 0 ? 
                    product.products.map((product, index) => 
                    <tr key={product._id}>
                        <td>{index+1}</td>
                        <td>{product.name}</td>
                        <td>&#8377; {product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category.name}</td>
                        <td><FaEdit /> | <FaEye onClick={() => showProductDetailsModal(product)}/></td>
                    </tr>
                    ) : null}
                
                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
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
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Product
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const renderProductsDetailsModal = () => {
        if(!productDetails)
            return null;
        
        return (
            <Modal size="lg" show={productDetailsModal} onHide={handleCloseProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <label className="font-weight-bold">Name</label>
                            <p>{productDetails.name}</p>
                        </Col>
                        <Col md="6">
                            <label className="font-weight-bold">Price</label>
                            <p>&#8377; {productDetails.price}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <label className="font-weight-bold">Quantity</label>
                            <p>{productDetails.quantity}</p>
                        </Col>
                        <Col md="6">
                            <label className="font-weight-bold">Category</label>
                            <p>{productDetails.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <label className="font-weight-bold">Description</label>
                            <p>{productDetails.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex'}}>
                            {productDetails.productPictures.map((picture) =>
                            (
                                <div className="w-25 overflow-hidden">
                                    <img class="w-100" style={{objectFit:'contain'}} src={`http://localhost:5000/public/${picture.img}`} />
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
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
            {renderAddProductModal()}
            {renderProductsDetailsModal()}
        </Container>
    )
}

export default Products;