import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Xoc Shop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/history">History</Nav.Link>
          <Nav.Link href="/">Roll</Nav.Link>
          <Nav.Link href="/topup">Top-up</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
        <Button variant="outline-light" onClick={logout}>Logout</Button>
      </Container>
    </Navbar>
  );
}