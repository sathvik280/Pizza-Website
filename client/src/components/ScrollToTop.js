import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (props) => {
    const { pathname } = useLocation();

    useEffect( () => {
        window.scrollTo( {top: 0} );
    }, [pathname]);
};

export default ScrollToTop;