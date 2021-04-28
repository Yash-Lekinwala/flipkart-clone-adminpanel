import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions/page.actions';
import Sidebar from '../../components/Sidebar';
import Input from '../../components/UI/Input';
import categoryList from '../../helpers/linearCategories';

const initialState = {
    title: '',
    category: '',
    description: '',
    type: ''
};

const NewPage = () => {

    const [formData, setFormData] = useState(initialState);
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    console.log(category);
    const [categories, setCategories] = useState([]);
    const [banners, setBanners] = useState([]);
    const [productsImages, setProductsImages] = useState([]);
    const page = useSelector(state => state.page);
    const dispatch = useDispatch();

    useEffect(() => {
        setCategories(categoryList(category.categories));
    }, [category]);

    useEffect(() => {
        console.log(page);
        if(!page.loading)
        {
            setShow(false);
            setFormData(initialState);
        }
    }, [page]);

    const handleShow = () => setShow(true);
    const handleClose = () => 
    {
        setFormData(initialState);
        setShow(false);
    }

    const handleChange = (e) => {
        if(e.target.name === 'category')
        {
            const category1 = categories.find(cat => cat.value === e.target.value);
            setFormData({...formData, type: category1.type});
        }
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handleBanners = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductsImages = (e) => {
        setProductsImages([...productsImages, e.target.files[0]]);
    }

    const handleSubmit = () => {
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('category', formData.category);
        form.append('type', formData.type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        })
        productsImages.forEach((product, index) => {
            form.append('products', product);
        })
        dispatch(createPage(form));        
    }

    const renderCreatePageModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input 
                        type="text"
                        label="Page Title"
                        value={formData.title}
                        placeholder={`Enter Page Title`} 
                        handleChange={handleChange}
                        name="title"
                    />
                    <div className="form-group">
                        <label>Select Category</label>
                        <select className="form-control" name="category" value={formData.categoryId} onChange={handleChange}>
                            <option>Select Category</option>
                            {
                                categories.map((option) =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" value={formData.description} rows={4} onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>Banners</label>
                        <input type="file" className="form-control" name="banners" onChange={handleBanners} />
                    </div>
                    <div className="form-group">
                        <label>Products Images</label>
                        <input type="file" className="form-control" name="products" onChange={handleProductsImages} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Page
                    </Button>
                </Modal.Footer>
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
                                {
                                    page.loading ?
                                    <p>
                                        Creating Page...Please wait!!!
                                    </p>
                                    : 
                                    <>
                                    <Button onClick={handleShow}> Add Page</Button>
                                    {renderCreatePageModal()}
                                    </>
                                }
                            
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default NewPage;
