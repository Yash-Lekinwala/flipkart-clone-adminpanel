import axios from "axios";
import { authConstants } from "../actions/constants";
import store from '../store';

const token = localStorage.getItem('token');

const API = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

API.interceptors.request.use((req) => {
    const {auth} = store.getState();
    if(auth.token)
    {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

API.interceptors.request.use((res) => {
    return res;
}, (error) => {
    console.log(error.response);
    const {status} = error.response;
    if(status === 500 || status === 400)
    {
        localStorage.clear();
        store.dispatch({type: authConstants.LOGOUT_SUCCESS});
    }
    return Promise.reject(error);
});



export const adminSignIn = (formData) => API.post('/admin/signin', formData);
export const adminSignUp = (formData) => API.post('/admin/signup', formData);
export const adminSignOut = () => API.post('/admin/signout');

export const fetchCategories = () => API.get('/category/getcategory');
export const addCategory = (formData) => API.post('/category/create', formData);
export const updateCategories = (formData) => API.post('/category/update', formData);
export const deleteCategories = (ids) => API.post('/category/delete', ids);

export const addProduct = (formData) => API.post('/product/create', formData);

export const getInitialData = () => API.get('/initialdata');