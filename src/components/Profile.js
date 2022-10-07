import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {logout} from '../action/actions';
import {useSelector} from 'react-redux';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const logoutUser = () => {
        dispatch(logout());
        console.log("USER logged out!");
        navigate('/login');
    }

  return (
    <div style={{textAlign: "center"}}>
    <Card>
        <Card.Body>
            <h2 style={{textAlign: "center"}}>Profile</h2>
            <p><b>Email:</b> {user}</p>
            <Button style={{width: "auto"}} variant="primary" type="submit">Update Profile</Button>
        </Card.Body>
    </Card>
    <Button onClick={logoutUser} variant="link">Log Out</Button>
    </div>
  )
}

export default Profile
