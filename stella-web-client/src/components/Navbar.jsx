import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav(props) {
    return (
        <Navbar className="nav" bg="dark" variant="light">
        <Container>
          <Navbar.Brand className="white-text" href="#home">Stella Pricing Tool</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default Nav;