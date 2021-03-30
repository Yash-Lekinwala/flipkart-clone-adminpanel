import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Input from '../../components/UI/Input';
import {signup} from '../../actions';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const Signup = () => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.authData);
    const user = useSelector(state => state.user);
    console.log(user);

    const userRegister = (e) => {
        e.preventDefault();
        dispatch(signup(formData));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    if(auth?.user?.fullName != null)
    {
        return <Redirect to={`/`} />
    }

    if(user.loading)
    {
        return <p>Loading...</p>
    }


    return (
        <Container>
            <Row className="mt-5">
                <Col md={{span: 6, offset: 3}}>
                    {user.message}
                    <Form onSubmit={userRegister}>
                        <Row>
                            <Col md={6}>
                                <Input label="First Name" placeholder="First Name" value={formData.firstName} type="text" handleChange={handleChange} name="firstName" />
                            </Col>
                            <Col md={6}>
                                <Input label="Last Name" placeholder="Last Name" value={formData.lastName} type="text" handleChange={handleChange} name="lastName" />
                            </Col>
                        </Row>
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

export default Signup;
