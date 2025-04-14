import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    api.get('/users/me')
      .then(res => setUser(res.data))
      .catch(() => navigate('/login'));
  }, []);

  if (!user) return null;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>ShadowLink</Navbar.Brand>
        <Nav>
          <Nav.Link href="/admin">โปรไฟล์ของฉัน</Nav.Link>
          <Nav.Link href={`/u/${user.username}`}>ดูหน้า Public</Nav.Link>
        </Nav>
        <span className="text-white me-3">{user.username}</span>
        <Button variant="outline-light" onClick={logout}>ออกจากระบบ</Button>
      </Container>
    </Navbar>
  );
}