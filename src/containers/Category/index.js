import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategories, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import {IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward, IoIosAdd, IoIosTrash} from 'react-icons/io';
import {FaEdit  } from 'react-icons/fa';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';

const initialState = {
    categoryName: '',
    parentCategoryId: '',
    categoryImage: '',
    type: ''
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
        if(formData.categoryName === '')
        {
            alert('Name is required');
            return;
        }
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
            options.push({
                value: category._id,
                name: category.name, 
                parentId: category.parentId,
                type: category.type
            });
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



    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map((item, index) => ({_id: item.value}));
        const expandedIdArray = expandedArray.map((item, index) => ({_id: item.value}));
        const idsArray = expandedIdArray.concat(checkedIdArray);
        if(checkedIdArray.length > 0)
        {
            dispatch(deleteCategoriesAction(checkedIdArray))
            .then(result => {
                if(result)
                {
                    dispatch(getAllCategories());
                }});
        }
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
                                <div className="actionBtnContainer float-right">
                                    <Button onClick={handleShow}><IoIosAdd /> Add</Button>
                                    <Button variant="danger" onClick={handleDeleteShow}><IoIosTrash /> Delete</Button>
                                    <Button variant="info" onClick={handleEditShow}><FaEdit /> Update</Button>
                                </div>
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
                        {/* edit category modal */}
                        <UpdateCategoriesModal 
                            editShow={editShow} 
                            handleEditClose={handleEditClose}
                            handleUpdate={handleUpdate}
                            handleChange={handleChange}
                            handleCategoryInput={handleCategoryInput}
                            expandedArray={expandedArray}
                            checkedArray={checkedArray}
                            categoryList={categoryList}
                            category={category} />
                        {/* add category modal */}
                        <AddCategoryModal
                            show={show}
                            handleClose={handleClose}
                            formData={formData}
                            handleChange={handleChange}
                            categoryList={categoryList}
                            category={category}
                            handleImage={handleImage}
                            handleSubmit={handleSubmit}
                        />
                        {renderDeleteCategoryModal()}
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Category;