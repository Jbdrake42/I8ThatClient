import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/signup", {
            method: "POST",
            body: JSON.stringify({user: {email: email, password: password}}),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }) .then(
            (response) => response.json()
        ) .then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <>
      Need an account? <a class="signup" onClick={toggle}>
        Sign up.  
      </a>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><h3>Sign Up</h3></ModalHeader>
        <ModalBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} />
                </FormGroup>
                <Button className="button" type="submit">Signup</Button>
            </Form>
      </ModalBody>
      </Modal>
        </>
    );
};

export default Signup;