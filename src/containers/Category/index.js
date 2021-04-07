import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from '../../actions';
import Input from "../../components/UI/Input";

const initialState = {
    categoryName: '',
    parentCategoryId: '',
    categoryImage: ''
};

const Category = () => {

    const [formData, setFormData] = useState(initialState);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        const form = new FormData();
        form.append('name', formData.categoryName);
        form.append('parentId', formData.parentCategoryId);
        form.append('categoryImage', formData.categoryImage);
        dispatch(addCategory(form));
        setFormData(initialState);
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleClose = () => 
    {
        setFormData(initialState);
        setShow(false);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleImage = (e) => {
        setFormData({...formData, [e.target.name]: e.target.files[0]});
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for(let category of categories)
        {
            myCategories.push(
                <li key={category._id}>
                    {category.name}
                    {category.children.length > 0 ? (
                        <ul>
                            {renderCategories(category.children)}
                        </ul>
                    ) : null}
                </li>
            );
        }
        return myCategories;
    }

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

    return (
        <Container fluid>
            <Row>
                <Sidebar />
                <Col md={10} style={{marginLeft: 'auto', paddingTop: '60px'}}>
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <h3>Category</h3>
                                <Button className="float-right" onClick={handleShow}>Add</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ul>
                                    {renderCategories(category.categories)}
                                </ul>
                            </Col>
                        </Row>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input 
                                    type="text"
                                    label="Category Name"
                                    value={formData.categoryName}
                                    placeholder={`Enter Category`} 
                                    handleChange={handleChange}
                                    name="categoryName"
                                />
                                <div className="form-group">
                                    <label>Select Parent Category</label>
                                    <select className="form-control" name="parentCategoryId" value={formData.parentCategoryId} onChange={handleChange}>
                                        <option>Select Category</option>
                                        {
                                            categoryList(category.categories).map((option) =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </select>
                                </div>
                                <Input type="file" label="category Image" name="categoryImage" handleChange={handleImage} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleSubmit}>
                                    Save Category
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Category;