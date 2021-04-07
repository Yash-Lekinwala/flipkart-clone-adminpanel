import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api/'
});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token'))
    {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return req;
});

export const adminSignIn = (formData) => API.post('/admin/signin', formData);
export const adminSignUp = (formData) => API.post('/admin/signup', formData);
export const adminSignOut = () => API.post('/admin/signout');

export const fetchCategories = () => API.get('/category/getcategory');
export const addCategory = (formData) => API.post('/category/create', formData);

// export const fetchCategories = () => API.get('/category/getcategory');
export const addProduct = (formData) => API.post('/product/create', formData);