import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Input from '../../../components/UI/Input';

const UpdateCategoriesModal = ({editShow, handleEditClose, handleUpdate, handleChange, handleCategoryInput, expandedArray, checkedArray, categoryList, category}) => {
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
                            <select className="form-control" name="type" value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}>
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
                            <select className="form-control" name="type" value={item.type}
                            onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
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

export default UpdateCategoriesModal;