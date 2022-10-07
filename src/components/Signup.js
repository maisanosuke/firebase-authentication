import React from 'react'
import {Button, Form, Card} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword } from "firebase/auth";
import Flash from './Flash';
import {login} from '../action/actions';
import {useDispatch} from 'react-redux';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initUser = () => ({
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [userData, setUserData] = React.useState(initUser());
    const [flash, setFlash] = React.useState(null);

    const signupUser = async (e) => {
        e.preventDefault();
        const {email, password, passwordConfirm} = userData;
        if(password !== passwordConfirm){
            setFlash({variant: "danger", message: "Password do not match!"});
        }
        else{
            try{
                const user = await createUserWithEmailAndPassword(auth, email, password);
                dispatch(login(userData.email));
                console.log("Signed Up a user!");
                console.log(user);
                setFlash({variant: "success", message: "Signed Up a user!"});
                navigate('/');
            }catch(e){
                setFlash({variant: "danger", message: `${e.code}`});
            }
        }
    }

    const handleChange = (e) => {
        setUserData(prevData => ({...prevData, [e.target.name]: e.target.value}));
    }

//style={{width: "25rem", margin: "50px auto 10px auto",padding: "20px"}}
  return (
      <>
        <Card >
        <Card.Body>
            <h2 style={{textAlign: "center"}}>Sign Up</h2>
            {flash && <Flash variant={flash.variant} message={flash.message}/>}
            <Form className="d-grid" onSubmit={signupUser}>
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter E-mail" name="email" value={userData.email} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control required type="password" placeholder="Enter Password Again" name="passwordConfirm" value={userData.passwordConfirm} onChange={handleChange}/>
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
