import { userConstants } from "./constants";
import * as api from "../api";

export const signup = (formData) => async (dispatch) => {
    dispatch({
        type: userConstants.USER_REGISTER_REQUEST, 
    });
    try {
        const {data} = await api.adminSignUp(formData);
        console.log(data);
        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS, 
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: userConstants.USER_REGISTER_FAILURE, 
            payload: error
        });
    }
}