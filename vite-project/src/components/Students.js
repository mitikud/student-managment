import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
import { getStudents, createStudent } from '../api';

function Students() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', email: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            toast.error('Failed to fetch students: ' + (error.response?.data || error.message));
        }
    };

    const handleCreateStudent = async () => {
        if (!newStudent.name || !newStudent.email) {
            toast.error('Name and email are required');
            return;
        }
        try {
            const student = await createStudent(newStudent);
            setStudents([...students, student]);
            setNewStudent({ name: '', email: '' });
            toast.success('Student created successfully');
        } catch (error) {
            toast.error('Failed to create student: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h1>Students</h1>
            <List>
                {students.map((student) => (
                    <ListItem key={student.id}>
                        <ListItemText primary={`${student.name} - ${student.email}`} />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleCreateStudent}>Add Student</Button>
        </div>
    );
}

export default Students;