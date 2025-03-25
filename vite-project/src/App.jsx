import React, { useState, useEffect } from 'react';
import { login, getStudents, createStudent } from './service/Api';

function App() {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', email: '' });
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            await login({ username, password });
            setLoggedIn(true);
            fetchStudents();
        } catch (error) {
            alert('Login failed');
        }
    };

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
          {!loggedIn ? (
              <div>
                  <h1>Login</h1>
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                  />
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                  />
                  <button onClick={handleLogin}>Login</button>
              </div>
          ) : (
              <div>
                  <h1>Students</h1>
                  <ul>
                      {students.map((student) => (
                          <li key={student.id}>
                              {student.name} - {student.email}
                          </li>
                      ))}
                  </ul>
                  <h2>Add Student</h2>
                  <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Name"
                  />
                  <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="Email"
                  />
                  <button onClick={handleCreateStudent}>Add Student</button>
              </div>
          )}
      </div>
  );
}

export default App;
