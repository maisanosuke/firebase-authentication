import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import {useUserContext} from '../context/AuthContext';
import {useFlashContext} from '../context/FlashContext';

function Profile() {
    const navigate = useNavigate();
    const {currentUser, logout} = useUserContext();
    const {setFlash} = useFlashContext();

    const logoutUser = async () => {
      try{
        await logout();
        setFlash({variant: "success", message:'User logged out!'});
        console.log("USER logged out!");
        navigate('/login');
      }catch(e){
        setFlash({variant: "danger", message: `${e.message}`});
      }         
    }

  return (
    <div style={{textAlign: "center"}}>
    <Card>
        <Card.Body>
            <h2 style={{textAlign: "center"}}>Profile</h2>
            <p><b>Email:</b> {currentUser.email}</p>
            <Button onClick={()=>navigate('/update')} style={{width: "auto"}} variant="primary" type="submit">Update Profile</Button>
        </Card.Body>
    </Card>
    <Button onClick={logoutUser} variant="link">Log Out</Button>
    </div>
  )
}

export default Profile
