import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Input from "../../components/UI/Input";
import {login} from '../../actions';

const Signin = () => {

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }

        login(user);
    }
    
    return (
        <Container>
            <Row className="mt-5">
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userLogin}>
                        <Input label="Email" placeholder="Email" value="" type="email" onChange={() => {}} />
                        <Input label="Password" placeholder="Password" value="" type="password" onChange={() => {}} />
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
