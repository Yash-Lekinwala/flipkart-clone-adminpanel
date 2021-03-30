import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css';

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={2} className="sidebar">Side bar</Col>
                <Col md={10} style={{marginLeft: 'auto'}}>container</Col>
            </Row>
        </Container>
    )
}

export default Home;
