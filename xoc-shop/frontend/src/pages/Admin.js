import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import api from '../services/api';
import { Container, Form, Button } from 'react-bootstrap';

export default function Admin() {
  const [userId, setUserId] = useState('');
  const [common, setCommon] = useState(70);
  const [rare, setRare] = useState(25);
  const [legendary, setLegendary] = useState(5);
  
  const submit = async () => {
    try {
      await api.post(`/users/set-drop-rate/${userId}`, { common, rare, legendary });
      alert('Updated!');
    } catch {
      alert('Fail');
    }
  };
  
  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Admin - Set Drop Rate</h2>
      <Form>
        <Form.Group>
          <Form.Label>User ID</Form.Label>
          <Form.Control onChange={e => setUserId(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Common (%)</Form.Label>
          <Form.Control type="number" value={common} onChange={e => setCommon(+e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rare (%)</Form.Label>
          <Form.Control type="number" value={rare} onChange={e => setRare(+e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Legendary (%)</Form.Label>
          <Form.Control type="number" value={legendary} onChange={e => setLegendary(+e.target.value)} />
        </Form.Group>
        <Button className="mt-3" onClick={submit}>Update</Button>
      </Form>
    </Container>
  );
}