import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import api from '../services/api';
import { Container, Button, Card } from 'react-bootstrap';

export default function Shop() {
  const [item, setItem] = useState(null);
  const [wallet, setWallet] = useState(0);
  
  const fetchUser = async () => {
    const res = await api.get('/users/me');
    setWallet(res.data.wallet);
  };
  
  const rollItem = async () => {
    try {
      const res = await api.post('/items/roll');
      setItem(res.data.item);
      fetchUser();
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <Container className="text-center mt-5">
      <h2>Xoc Shop - Roll Page</h2>
      <p>Wallet: ${wallet}</p>
      <Button onClick={rollItem} className="mb-4">Roll (10 coins)</Button>

      {item && (
        <Card className="mx-auto" style={{ width: '300px' }}>
          <Card.Img variant="top" src={`/images/${item.image}`} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>Rarity: {item.rarity}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}