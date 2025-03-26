import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { getTeachers, createTeacher } from '../api';

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: '', email: '' });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const data = await getTeachers();
            setTeachers(data);
        } catch (error) {
            alert('Failed to fetch teachers');
        }
    };

    const handleCreateTeacher = async () => {
        try {
            const teacher = await createTeacher(newTeacher);
            setTeachers([...teachers, teacher]);
            setNewTeacher({ name: '', email: '' });
        } catch (error) {
            alert('Failed to create teacher');
        }
    };

    return (
        <div>
            <h1>Teachers</h1>
            <List>
                {teachers.map((teacher) => (
                    <ListItem key={teacher.id}>
                        <ListItemText primary={`${teacher.name} - ${teacher.email}`} />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleCreateTeacher}>Add Teacher</Button>
        </div>
    );
}

export default Teachers;