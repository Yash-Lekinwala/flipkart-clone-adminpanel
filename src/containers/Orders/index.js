import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

const Orders = () => {
    return (
        <Container fluid>
            <Row>
                <Sidebar />
                <Col md={10} style={{marginLeft: 'auto'}}>Orders</Col>
            </Row>
        </Container>
    )
}

export default Orders;