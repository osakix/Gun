import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const register = async () => {
    await api.post('/auth/register', { username, password });
    navigate('/login');
  };
  
  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Register</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button onClick={register}>Register</Button>
      </Form>
    </Container>
  );
}