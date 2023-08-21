import React from 'react';

import logo from '../assets/img/logo.svg';

const Header2 = (props) => {
    return (
        <div className="w-full bg-primary shadow-md sticky top-0 left-0 right-0 z-10">
            <div className="flex items-center justify-center px-6 md:px-8 lg:px-10 py-8 max-w-[1024px] mx-auto">
                <div>
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Header2;