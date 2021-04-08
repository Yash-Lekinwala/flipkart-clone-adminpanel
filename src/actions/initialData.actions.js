import { categoryConstants, initialDataConstants, productConstants } from "./constants";
import * as api from '../api';

export const getInitialData = () => async (dispatch) => {
    dispatch({
        type: initialDataConstants.INITIAL_DATA_REQUEST, 
    });
    try {
        const {data} = await api.getInitialData();
        console.log(data);
        const {categories, products} = data;
        dispatch({
            type: categoryConstants.CATEGORY_SUCCESS,
            payload: {categories}
        });
        dispatch({
            type: productConstants.PRODUCT_SUCCESS,
            payload: {products}
        });
    } catch (error) {
        dispatch({
            type: initialDataConstants.INITIAL_DATA_FAILURE, 
            payload: error
        });
    }

}
