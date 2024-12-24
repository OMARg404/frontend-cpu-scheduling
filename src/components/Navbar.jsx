// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/" className="ms-4">CPU Scheduling</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4">
            <LinkContainer to="/fcfs">
              <Nav.Link>FCFS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/preemptive-sjf">
              <Nav.Link>Preemptive SJF</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/priority-scheduling">
              <Nav.Link>Priority Scheduling</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/round-robin">
              <Nav.Link>Round Robin</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sjf-non-preemptive">
              <Nav.Link>SJF Non-Preemptive</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Add margin below the navbar */}
      <div style={{ marginTop: '80px' }}></div> {/* Adjust the value as needed */}
    </div>
  );
};

export default AppNavbar;
