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
        dispatch({
            type: authConstants.LOGIN_FAILURE, 
            payload: error
        });
    }
}

export const isUserLoggedIn = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if(token)
    {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch({
            type: authConstants.LOGIN_REQUEST, 
            data: {token, user}
        });
    }
    else
    {
        dispatch({
            type: authConstants.LOGIN_FAILURE, 
            payload: { error: 'Failed to login.'}
        });
    }    
}

export const signout = () => async (dispatch) => {
    dispatch({
        type: authConstants.LOGOUT_REQUEST
    })
    try {
        const {data} = await api.adminSignOut();
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error }
        })
    }
}