import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Input from '../../../components/UI/Input';


const AddCategoryModal = ({show, handleClose, formData, handleChange, categoryList, category, handleImage, handleSubmit}) => {
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

export default AddCategoryModal;