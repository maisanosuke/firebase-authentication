import React from 'react';
import {Button, Form, Card} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Flash from './Flash';
import {useDispatch} from 'react-redux';
import {login} from '../action/actions';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initUser = () =>({email: "", password: ""});
    const [userData, setUserData] = React.useState(initUser());
    const [message, setMessage] = React.useState(null);

    const handleChange = (e) => {setUserData(prevData =>({...prevData, [e.target.name]: e.target.value}))}
    const loginUser = async (e) => {
        e.preventDefault();
        console.log(userData);
        const {email, password} = userData;
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            dispatch(login(email));
            console.log(user);
            console.log("USER LOGGED IN!");
            navigate("/");
        }catch(e){
            console.log(`error code: ${e.code}`);
            console.log(`error message: ${e.message}`);
            setMessage(`${e.code}`)
            
        }
    }

  return (
    <div>
        <Card>
            <Card.Body>
                <h2 style={{textAlign: "center"}}>Log In</h2>
                {message && <Flash variant='danger' message={message} />}
                <Form className="d-grid" onSubmit={loginUser}>
                    <Form.Group className="mb-3">
                        <Form.Label >Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter E-mail" name="email" value={userData.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange}/>
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
