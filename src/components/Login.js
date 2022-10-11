import React from 'react';
import {Button, Form, Card} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useUserContext} from '../context/AuthContext';
import {useFlashContext} from '../context/FlashContext'

function Login() {
    const navigate = useNavigate();
    const {signin} = useUserContext();
    const {setFlash} = useFlashContext();
    //const initUser = () =>({email: "", password: ""});
    //const [userData, setUserData] = React.useState(initUser());
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    //const handleChange = (e) => {setUserData(prevData =>({...prevData, [e.target.name]: e.target.value}))}
    const loginUser = async (e) => {
        e.preventDefault();
        try{
            await signin({email: emailRef.current.value, password: passwordRef.current.value});
            setFlash({variant: "success", message: "user signed in!"});
            navigate('/');
        }catch(e){
            setFlash({variant: "danger", message: `${e.message}`});
        }
    }

  return (
    <div>
        <Card>
            <Card.Body>
                <h2 style={{textAlign: "center"}}>Log In</h2>
                <Form className="d-grid" onSubmit={loginUser}>
                    <Form.Group className="mb-3">
                        <Form.Label >Email</Form.Label>
                        <Form.Control ref={emailRef} required type="email" placeholder="Enter E-mail" name="email"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordRef} required type="password" placeholder="Password" name="password"/>
                    </Form.Group>
                    <Button className="mb-3" style={{width: "auto"}} variant="primary" type="submit">Log In</Button>
                    <Link style={{textAlign: "center"}} to="/forgot-password">Forgot Password?</Link>
                </Form>
            </Card.Body>
        </Card>
        <p style={{textAlign: "center"}}>Need an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default Login
