import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import api from '../services/api';
import { Container, Form, Button } from 'react-bootstrap';

export default function Topup() {
  const [amount, setAmount] = useState(50);
  
  const topup = async () => {
    try {
      const res = await api.post('/users/topup', { amount });
      alert('Success! New wallet: $' + res.data.wallet);
    } catch {
      alert('Top-up failed');
    }
  };
  
  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Top-up Wallet</h2>
      <Form>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={e => setAmount(+e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" onClick={topup}>Top-up</Button>
      </Form>
    </Container>
  );
}