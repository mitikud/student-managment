import axios from 'axios';

const API_URL = 'http://localhost:8082/auth'; // Auth Service
const STUDENT_API_URL = 'http://localhost:8083/students'; // Student Service
const TEACHER_API_URL = 'http://localhost:8084/teachers';
const COURSE_API_URL = 'http://localhost:8085/courses';

const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data);
    return response.data;
};

// export const getStudents = async () => {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(STUDENT_API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// export const createStudent = async (student) => {
//     const token = localStorage.getItem('token');
//     const response = await axios.post(STUDENT_API_URL, student, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// Student API
export const getStudents = async () => (await axios.get(STUDENT_API_URL, getHeaders())).data;
export const createStudent = async (student) => (await axios.post(STUDENT_API_URL, student, getHeaders())).data;

// Teacher API
export const getTeachers = async () => (await axios.get(TEACHER_API_URL, getHeaders())).data;
export const createTeacher = async (teacher) => (await axios.post(TEACHER_API_URL, teacher, getHeaders())).data;

// Course API
export const getCourses = async () => (await axios.get(COURSE_API_URL, getHeaders())).data;
export const createCourse = async (course) => (await axios.post(COURSE_API_URL, course, getHeaders())).data;
export const enrollStudent = async (courseId, studentId) => 
    (await axios.post(`${COURSE_API_URL}/${courseId}/enroll/${studentId}`, {}, getHeaders())).data;