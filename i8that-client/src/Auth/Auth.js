import React from "react";
import { Container, Row, Col } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";
import APIURL from "../helpers/environment";

const Auth = (props) => {
    return (
        <Container className="auth-container">
            <Row>
                <Col className="loginpage">
                    <Login updateToken={props.updateToken} />
                    <center><Signup updateToken={props.updateToken} /></center>
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;