import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
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
            alert('Failed to fetch students');
        }
    };

    const handleCreateStudent = async () => {
        try {
            const student = await createStudent(newStudent);
            setStudents([...students, student]);
            setNewStudent({ name: '', email: '' });
        } catch (error) {
            alert('Failed to create student');
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