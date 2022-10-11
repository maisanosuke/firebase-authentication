import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';// Importing the Bootstrap CSS
import { Container } from "react-bootstrap";
import { useFlashContext } from "../context/FlashContext";
import { useUserContext } from "../context/AuthContext" 

//Components
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import Flash from "./Flash";
import UpdateProfile from "./UpdateProfile";
import PrivateRoute from './PrivateRoute';

function App() {
  const {flash} = useFlashContext();
  const {currentUser} = useUserContext();

  return (  
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: '400px'}}>
      {flash && <Flash variant={flash.variant} message={flash.message} />}
        <BrowserRouter>
          <Routes>     

          <Route path="/login" element={currentUser ? <Profile/> : <Login/>}/>       

            <Route exact path='/' element={<PrivateRoute/>}>
              <Route index element={<Profile />} />
              <Route path='/update' element={<UpdateProfile/>} />
            </Route>

            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  )
}

export default App;
