import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Card } from 'react-bootstrap';
import NavBar from '../components/Navbar';

export default function History() {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    api.get('/users/history').then(res => setHistory(res.data));
  }, []);
  
  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <h2>Roll History</h2>
        {history.map((h, i) => (
          <Card key={i} className="mb-2" style={{ width: '300px' }}>
            <Card.Img variant="top" src={`/images/${h.image}`} />
            <Card.Body>
              <Card.Title>{h.name}</Card.Title>
              <Card.Text>
                Rarity: {h.rarity} <br />
                Date: {new Date(h.date).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}