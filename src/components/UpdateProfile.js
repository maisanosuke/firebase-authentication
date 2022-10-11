import React from 'react'
import {useUserContext} from '../context/AuthContext';
import { useFlashContext } from '../context/FlashContext';
import {Card, Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

function UpdateProfile() {
    const {currentUser, updateProfileEmail, updateProfilePassword} = useUserContext(); //user contains user's email
    const {setFlash} = useFlashContext();
    const navigate = useNavigate();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            setFlash({variant: "danger", message: "Password do not match!"});
            return
        }
        if(emailRef.current.value.length && emailRef.current.value !== currentUser.email){
            try{
                await updateProfileEmail(emailRef.current.value);
                console.log('Email updated');
            }catch(e){
                setFlash({variant: "danger", message: e.message});
                return
            }
        }
        if(passwordRef.current.value.length){
            try{
                await updateProfilePassword(passwordRef.current.value);
                console.log('Password updated');
            }catch(e){
                setFlash({variant: "danger", message: e.message});
                return
            }
        }
        navigate('/');
        setFlash({variant: "success", message: "User data updated!"});
    }

  return (
    <div>
        <Card >
        <Card.Body>
            <h2 style={{textAlign: "center"}}>Update Profile</h2>
            <Form className="d-grid" onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control ref={emailRef} type="email" name="email" defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Leave blank to keep the same" name="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control ref={passwordConfirmRef} type="password" placeholder="Leave blank to keep the same" name="passwordConfirm" />
                </Form.Group>
                <Button style={{width: "auto"}} variant="primary" type="submit">Update</Button>
            </Form>
            </Card.Body>
        </Card>
        <Link to="/">Cancel</Link>
    </div>
  )
}

export default UpdateProfile
