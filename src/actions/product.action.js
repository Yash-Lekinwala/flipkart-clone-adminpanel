import { productConstants } from "./constants";
import * as api from '../api';

export const addProduct = (formData) => async (dispatch) => {
    dispatch({
        type: productConstants.ADD_PRODUCT_REQUEST, 
    });
    try {
        const {data} = await api.addProduct(formData);
        console.log(data);
        dispatch({
            type: productConstants.ADD_PRODUCT_SUCCESS,
            payload: {category: data.category}
        });
    } catch (error) {
        dispatch({
            type: productConstants.ADD_PRODUCT_FAILURE, 
            payload: error
        });
    }
}