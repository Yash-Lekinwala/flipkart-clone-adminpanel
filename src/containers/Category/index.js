import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategories, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions';
import Input from "../../components/UI/Input";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import {IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward} from 'react-icons/io';

const initialState = {
    categoryName: '',
    parentCategoryId: '',
    categoryImage: ''
};

const Category = () => {

    const [formData, setFormData] = useState(initialState);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const handleSubmit = () => {
        const form = new FormData();
        form.append('name', formData.categoryName);
        form.append('parentId', formData.parentCategoryId);
        form.append('categoryImage', formData.categoryImage);
        dispatch(addCategory(form));
        setFormData(initialState);
        setShow(false);
    }

    const handleUpdate = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : '');
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : '');
        });
        // form.append('categoryImage', formData.categoryImage);
        dispatch(updateCategories(form))
        .then(result => {
            if(result)
            {
                dispatch(getAllCategories());
            }
        });
        setEditShow(false);
        
    }
    const handleShow = () => setShow(true);
    const handleClose = () => 
    {
        setFormData(initialState);
        setShow(false);
    }
    const handleEditShow = () => {
        updateCheckedAndExpandedCategories();
        setEditShow(true);
    }
    
    const updateCheckedAndExpandedCategories = () => {
        const categories = categoryList(category.categories);
        const checkArray = [];
        const ExpandArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const checkedCategory = categories.find((category, _index) => categoryId == category.value);
            checkedCategory && checkArray.push(checkedCategory);
        });
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const expandedCategory = categories.find((category, _index) => categoryId == category.value);
            expandedCategory && ExpandArray.push(expandedCategory);
        });
        setCheckedArray(checkArray);
        setExpandedArray(ExpandArray);
    }

    const handleEditClose = () => 
    {
        setFormData(initialState);
        setEditShow(false);
    }

    const handleDeleteShow = () => {
        updateCheckedAndExpandedCategories();
        setDeleteShow(true);
    }

    const handleDeleteClose = () => 
    {
        setDeleteShow(false);
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
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const categoryList = (categories, options = []) => {
        for(let category of categories)
        {
            options.push({value: category._id, name: category.name, parentId: category.parentId})
            if(category.children.length > 0)
            {
                categoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryInput = (key, value, index, type) => {
        if(type == 'checked')
        {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? {...item, [key]: value} : item);
            setCheckedArray(updatedCheckedArray);
        }
        else if(type == 'expanded')
        {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? {...item, [key]: value} : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const renderUpdateCategoriesModal = () => {
        return (
        <Modal show={editShow} onHide={handleEditClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    expandedArray.length > 0 && 
                    expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input 
                                type="text"
                                label="Category Name"
                                value={item.name}
                                placeholder={`Enter Category`} 
                                handleChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                name="categoryName"
                            />
                        </Col>
                        <Col>
                            <div className="form-group">
                                <label>Select Parent Category</label>
                                <select className="form-control" name="parentCategoryId" value={item.parentId} 
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>Select Category</option>
                                    {
                                        categoryList(category.categories).map((option) =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group">
                                <label>Select Type</label>
                                <select className="form-control" name="parentCategoryId" value={formData.parentCategoryId} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    )
                }
                {
                    checkedArray.length > 0 && 
                    checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input 
                                type="text"
                                label="Category Name"
                                value={item.name}
                                placeholder={`Enter Category`} 
                                handleChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                name="categoryName"
                            />
                        </Col>
                        <Col>
                            <div className="form-group">
                                <label>Select Parent Category</label>
                                <select className="form-control" name="parentCategoryId" value={item.parentId} 
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>Select Category</option>
                                    {
                                        categoryList(category.categories).map((option) =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group">
                                <label>Select Type</label>
                                <select className="form-control" name="parentCategoryId" value={formData.parentCategoryId} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    )
                }
                {/* <Input type="file" label="category Image" name="categoryImage" handleChange={handleImage} /> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>
                    Update Category
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }

    const renderAddCategoryModal = () => {
        return (
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
        );
    }

    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map((item, index) => ({_id: item.value}));
        const expandedIdArray = expandedArray.map((item, index) => ({_id: item.value}));
        const idsArray = expandedIdArray.concat(checkedIdArray);
        dispatch(deleteCategoriesAction(idsArray))
        .then(result => {
            if(result)
            {
                dispatch(getAllCategories());
            }});
        setDeleteShow(false);        
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You Sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteCategories}>
                        Delete Category
                    </Button>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Cancel
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
                                <h3>Category</h3>
                                <Button className="float-right" onClick={handleShow}>Add</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <CheckboxTree
                                    nodes={renderCategories(category.categories)}
                                    checked={checked}
                                    expanded={expanded}
                                    onCheck={checked => setChecked(checked)}
                                    onExpand={expanded => setExpanded(expanded)}
                                    icons={{
                                        check: <IoIosCheckbox />,
                                        uncheck: <IoIosCheckboxOutline />,
                                        halfCheck: <IoIosCheckboxOutline />,
                                        expandClose: <IoIosArrowForward />,
                                        expandOpen: <IoIosArrowDown />
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="danger" onClick={handleDeleteShow}>Delete</Button>
                                <Button variant="info" onClick={handleEditShow}>Update</Button>
                            </Col>
                        </Row>
                        {/* edit category modal */}
                        {renderUpdateCategoriesModal()}
                        {/* add category modal */}
                        {renderAddCategoryModal()}
                        {renderDeleteCategoryModal()}
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Category;