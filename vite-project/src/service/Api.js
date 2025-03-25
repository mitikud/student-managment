import axios from 'axios';

const API_URL = 'http://localhost:8081/auth'; // Auth Service
const STUDENT_API_URL = 'http://localhost:8082/students'; // Student Service

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data);
    return response.data;
};

export const getStudents = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(STUDENT_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createStudent = async (student) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(STUDENT_API_URL, student, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};