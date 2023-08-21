import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header2 from '../components/Header2';

const NotFound = (props) => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-[#F6F6F6] relative">
            <Header2 />

            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white mt-[25px] rounded-xl flex flex-col items-center py-6 px-4"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[22px] text-gray-600 text-center">
                    Sorry, this page isn't available
                </div>

                <div className="text-center mt-4 text-lg text-[#666666]">
                    The link you followed may be broken, or the page may have been removed
                </div>

                <button 
                    className="text-primary underline mt-4 text-center"
                    onClick={ () => {
                        navigate('/home', {
                            replace: true
                        });
                    }}
                >
                    Go back to Pizzaland
                </button>
            </div>
        </div>
    );
}

export default NotFound;