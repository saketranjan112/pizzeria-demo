import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000'});

export const fetchPizzas = () => API.get('/pizzas');
export const fetchToppings = () => API.get('/toppings');
export const getCart = (id) => API.get(`/cart/${id}`);

export const signIn = (formData) => API.post('/user/signIn', formData);
export const register = (formData) => API.post('/user/register', formData);