import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import Flash from './Flash';


function ForgotPassword() {
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/login',
        // This must be true.
        handleCodeInApp: true
      };
    const auth = getAuth();

    const [email, setEmail] = React.useState('');
    const [flash, setFlash] = React.useState(null);

    const handleChange = (e) => {setEmail(e.target.value)};
    const resetPassword = async (e) => {
        e.preventDefault();
        console.log("user email ", email);
        try{
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setEmail("");
            setFlash({variant: "success", message: "The link was successfully sent!"});
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
            {flash && <Flash variant={flash.variant} message={flash.message}/>}
            <Form className="d-grid mb-3" onSubmit={resetPassword}>
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter E-mail" name="email" value={email} onChange={handleChange}/>
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
