import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api/'
});

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile'))
//     {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// });

// export const userSignIn = (formData) => API.post('/signin', formData);
export const adminSignIn = (formData) => API.post('/admin/signin', formData);