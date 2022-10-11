import React from 'react'
import {Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

function PrivateRoute() {
    const {currentUser} = useUserContext();
    console.log('currentUser: ', currentUser);

    return(
        currentUser ? <Outlet /> : <Navigate to='/login'/>
    )
}

export default PrivateRoute
