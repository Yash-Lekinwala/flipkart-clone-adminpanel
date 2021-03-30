import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Input from "../../components/UI/Input";
import {login} from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';

const initialState = {
    email: '',
    password: ''
};

const Signin = () => {

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.authData);

    const userLogin = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    if(auth?.user?.fullName != null)
    {
        return <Redirect to={`/`} />
    }
    
    return (
        <Container>
            <Row className="mt-5">
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userLogin}>
                        <Input label="Email" placeholder="Email" value={formData.email} type="email" handleChange={handleChange} name="email" />
                        <Input label="Password" placeholder="Password" value={formData.password} type="password" handleChange={handleChange} name="password" />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Signin;
