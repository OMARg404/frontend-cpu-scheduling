// src/components/HomePage.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Welcome to CPU Scheduling</Card.Title>
              <Card.Text>
                This is a platform where you can learn and visualize different CPU scheduling algorithms.
              </Card.Text>
              <Button variant="primary" href="#learn-more">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>What is CPU Scheduling?</Card.Title>
              <Card.Text>
                CPU scheduling is the process of determining which processes run when there are multiple runnable processes.
                It is essential for achieving efficient multitasking and optimal system performance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Why Learn CPU Scheduling?</Card.Title>
              <Card.Text>
                Understanding CPU scheduling is crucial for software developers, system administrators, and computer science students.
                It helps in optimizing system performance, ensuring fair process execution, and improving user experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>First-Come, First-Served (FCFS)</Card.Title>
              <Card.Text>
                FCFS is the simplest scheduling algorithm that schedules processes in the order they arrive.
                It can lead to the "convoy effect" where short processes wait for long processes to complete.
              </Card.Text>
              <Button variant="primary" href="/fcfs">Explore FCFS</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Round Robin (RR)</Card.Title>
              <Card.Text>
                Round Robin is a preemptive algorithm that assigns a fixed time slice to each process in a cyclic order.
                It is designed for time-sharing systems and aims to ensure fairness and responsiveness.
              </Card.Text>
              <Button variant="primary" href="/round-robin">Explore Round Robin</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Priority Scheduling</Card.Title>
              <Card.Text>
                Priority Scheduling assigns a priority to each process and schedules processes based on their priority.
                Higher priority processes are scheduled before lower priority ones.
              </Card.Text>
              <Button variant="primary" href="/priority-scheduling">Explore Priority Scheduling</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
