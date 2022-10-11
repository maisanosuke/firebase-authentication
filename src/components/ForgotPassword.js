import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import {useUserContext} from '../context/AuthContext';
import {useFlashContext} from '../context/FlashContext';


function ForgotPassword() {
    const {sendForgotPasswordEmail} = useUserContext();
    const {setFlash} = useFlashContext();

    const emailRef = React.useRef();
    
    const resetPassword = async (e) => {
        e.preventDefault();
        console.log("user email ", emailRef.current.value);
        try{
            await sendForgotPasswordEmail(emailRef.current.value);
            setFlash({variant: "success", message: "Check your inbox to reset your password!"});
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
        }catch(e){
            setFlash({variant: "danger", message: e.code});
        }
    }
  return (
    <div>
        <Card>
            <Card.Body>
            <h2 className='text-center'>Reset Password</h2>
            <Form className="d-grid mb-3" onSubmit={resetPassword}>
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter E-mail" name="email"/>
                </Form.Group>
                <Button style={{width: "auto"}} variant="primary" type="submit">Reset Password</Button>
            </Form>
            <Link to="/login" className='text-center'>Log In</Link>
            </Card.Body>
        </Card>
        <div className='text-center'>Need an account? <Link to="/signup">Sign Up</Link></div>
    </div>
  )
}

export default ForgotPassword
