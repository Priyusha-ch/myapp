import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3006',
})

export const fetchContacts = () => api.get('/api/contacts');
export const addContact = (contact) => api.post('/api/contacts', contact);
export const loginUser = (email, password) => api.post('/api/login', { email, password });
export const signUpUser = (username, email, password) => api.post('/api/signup', { username, email, password });
export const deleteContact = (id) => api.delete(`/api/contacts/${id}`);


