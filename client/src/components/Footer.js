import React from 'react';

import logo from '../assets/img/logo.svg';

const Footer = (props) => {
    return (
        <div className="py-8 bg-pattern bg-primary">
            <div className="flex flex-col items-center gap-y-4 max-w-[1024px] mx-auto">
                <div>
                    <img src={logo} alt="" />
                </div>

                <div className="text-white text-[16px] md:text-[18px] text-center font-medium">
                    All rights reserved. Pizzaland 2023.
                </div>
            </div>
        </div>
    );
};

export default Footer;