import React from "react";
import { Container, Row, Col } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
    return (
        <Container className="auth-container">
            <Row>
                <Col className="loginpage">
                    <Login updateToken={props.updateToken} />
                    <Signup updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;