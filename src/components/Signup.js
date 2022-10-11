import React from 'react'
import {Button, Form, Card} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useUserContext} from '../context/AuthContext';
import {useFlashContext} from '../context/FlashContext';

function Signup() {
    const navigate = useNavigate();
    const { signup }= useUserContext();
    const {setFlash} = useFlashContext();

    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();

    // const initUser = () => ({
    //     email: "",
    //     password: "",
    //     passwordConfirm: ""
    // })
    //const [userData, setUserData] = React.useState(initUser());

    const signupUser = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            setFlash({variant: "danger", message: "Password do not match!"});
        }
        else{
            try{
                await signup({
                    email: emailRef.current.value, 
                    password: passwordRef.current.value, 
                    passwordConfirm: passwordConfirmRef.current.value
                });
                setFlash({variant: "success", message: "user signed up!"});
                navigate('/');
            }catch(e){
                setFlash({variant: "danger", message: `${e.message}`});
            }
        }
    }

    // const handleChange = (e) => {
    //     setUserData(prevData => ({...prevData, [e.target.name]: e.target.value}));
    // }

  return (
      <>
        <Card >
        <Card.Body>
            <h2 style={{textAlign: "center"}}>Sign Up</h2>
            <Form className="d-grid" onSubmit={signupUser}>
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control ref={emailRef} required type="email" placeholder="Enter E-mail" name="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} required type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control ref={passwordConfirmRef} required type="password" placeholder="Enter Password Again" name="passwordConfirm" />
                </Form.Group>
                <Button style={{width: "auto"}} variant="primary" type="submit">Sign Up</Button>
            </Form>
            </Card.Body>
        </Card>
        <p style={{textAlign: "center"}}>Already have an account? <Link to="/login">Log In</Link></p>
      </>
  )
}

export default Signup
