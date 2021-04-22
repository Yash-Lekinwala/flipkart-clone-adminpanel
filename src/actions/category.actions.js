import * as api from '../api';
import { categoryConstants } from './constants';

const getAllCategories = () => async (dispatch) => {
    dispatch({
        type: categoryConstants.CATEGORY_REQUEST, 
    });
    try {
        const {data} = await api.fetchCategories();
        const {categoryList} = data;
        dispatch({
            type: categoryConstants.CATEGORY_SUCCESS, 
            payload: {categories: categoryList}
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: categoryConstants.CATEGORY_FAILURE, 
            payload: error
        });
    }
}

export const addCategory = (formData) => async (dispatch) => {
    dispatch({
        type: categoryConstants.ADD_CATEGORY_REQUEST, 
    });
    try {
        const {data} = await api.addCategory(formData);
        dispatch({
            type: categoryConstants.ADD_CATEGORY_SUCCESS,
            payload: {category: data.category}
        });
    } catch (error) {
        dispatch({
            type: categoryConstants.ADD_CATEGORY_FAILURE, 
            payload: error
        });
    }
}

export const updateCategories = (formData) => async (dispatch) => {
    dispatch({type: categoryConstants.UPDATE_CATEGORY_REQUEST});
    try {
        const {data} = await api.updateCategories(formData);
        dispatch({type: categoryConstants.UPDATE_CATEGORY_SUCCESS});
        dispatch(getAllCategories());
        return true;
    } catch (error) {
        dispatch({
            type: categoryConstants.UPDATE_CATEGORY_FAILURE,
            payload: error
        });
    }
}

export const deleteCategories = (ids) => async (dispatch) => {
    dispatch({type: categoryConstants.DELETE_CATEGORY_REQUEST});
    try {
        const {data} = await api.deleteCategories(ids);
        dispatch({type: categoryConstants.DELETE_CATEGORY_SUCCESS});
        dispatch(getAllCategories());
        return true;
    } catch (error) {
        dispatch({
            type: categoryConstants.UPDATE_CATEGORY_FAILURE,
            payload: error
        });
    }
}

export {
    getAllCategories
}