import { authConstants } from "./constants";
import * as api from "../api";

export const login = (formData) => async (dispatch) => {
    try {
        const {data} = await api.adminSignIn(formData);
        dispatch({
            type: authConstants.LOGIN_REQUEST, 
            data
        });
    } catch (error) {
        console.log(error);
    }
}