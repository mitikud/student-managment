import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { login } from '../api';

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login({ username, password });
            setLoggedIn(true);
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <Box>
            <h1>Login</h1>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Box>
    );
}

export default Login;