import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem("token");
    return (
        isAuthenticated ? <Component {...rest} /> : <Navigate to="/Login" />
    );
}

export default PrivateRoute;
