import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes3 = (props) => {
    const { children } = props;
    const { token } = useSelector( (store) => store.auth);

    const { state } = useLocation();

    if (!token)
    {
        return <Navigate to='/' />;
    }
    
    if (!state)
    {
        return <Navigate to='/home' />;
    }

    return children;
};

export default PrivateRoutes3;