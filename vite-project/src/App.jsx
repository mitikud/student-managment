import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Courses from './components/Courses';

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Student Management System</Typography>
                    {loggedIn && (
                        <>
                            <Button color="inherit" component={Link} to="/students">Students</Button>
                            <Button color="inherit" component={Link} to="/teachers">Teachers</Button>
                            <Button color="inherit" component={Link} to="/courses">Courses</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: 20 }}>
                <Switch>
                    <Route exact path="/" component={() => <Login setLoggedIn={setLoggedIn} />} />
                    {loggedIn && (
                        <>
                            <Route path="/students" component={Students} />
                            <Route path="/teachers" component={Teachers} />
                            <Route path="/courses" component={Courses} />
                        </>
                    )}
                </Switch>
            </Container>
            <ToastContainer />
        </Router>
    );
}

export default App;