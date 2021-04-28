import React from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';

const Sidebar = () => {
    return (
        <Col md={2} className="sidebar">
            <ul>
                <li><NavLink exact to={'/'}>Home</NavLink></li>
                <li><NavLink to={'/page'}>Page</NavLink></li>
                <li><NavLink to={'/products'}>Products</NavLink></li>
                <li><NavLink to={'/orders'}>Orders</NavLink></li>
                <li><NavLink to={'/category'}>Category</NavLink></li>                
            </ul>
        </Col>
    )
}

export default Sidebar