import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';// Importing the Bootstrap CSS
import {useSelector} from 'react-redux';
import { Container } from "react-bootstrap";

//Components
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

function App() {
  const user = useSelector(state => state.user);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: '400px'}}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={user ? <Profile/> : <Navigate to="/login"/>}/>
            <Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  )
}

export default App;
