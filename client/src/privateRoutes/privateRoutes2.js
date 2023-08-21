import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes2 = (props) => {
    const { children } = props;
    const { token } = useSelector( (store) => store.auth);

    if (token)
    {
        return children;
    }

    return <Navigate to='/' />;
};

export default PrivateRoutes2;