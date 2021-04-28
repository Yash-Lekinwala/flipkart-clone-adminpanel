import { pageConstants } from "./constants";
import * as api from '../api';

export const createPage = (formData) => async (dispatch) => {
    dispatch({
        type: pageConstants.CREATE_PAGE_REQUEST, 
    });
    try {
        const {data} = await api.addPage(formData);
        dispatch({
            type: pageConstants.CREATE_PAGE_SUCCESS,
            payload: data.page
        });
    } catch (error) {
        dispatch({
            type: pageConstants.CREATE_PAGE_FAILURE, 
            payload: error
        });
    }
}