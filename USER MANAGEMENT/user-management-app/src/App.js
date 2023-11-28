// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the styles

const API_URL = 'http://localhost:3001/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert('Invalid email format');
      return;
    }

    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '', role: '' });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <h1>User Management System</h1>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email} - {user.role}
              <button onClick={() => handleDeleteUser(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add New User</h2>
        <form>
          <label>Name: <input type="text" name="name" value={newUser.name} onChange={handleInputChange} /></label>
          <label>Email: <input type="email" name="email" value={newUser.email} onChange={handleInputChange} /></label>
          <label>Role: <input type="text" name="role" value={newUser.role} onChange={handleInputChange} /></label>
          <button type="button" onClick={handleAddUser}>Add User</button>
        </form>
      </div>
    </div>
  );
};

export default App;
