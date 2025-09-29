import axios from 'axios';

const API_URL = 'https://tasks-xdfh.onrender.com/api/'; 

const api = axios.create({
    baseURL: API_URL,
});

export const getTasks = () => api.get('/tasks');

export const createTask = (taskData) => api.post('/tasks', taskData);

export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const moveTask = (id, moveData) => api.patch(`/tasks/${id}/move`, moveData);
