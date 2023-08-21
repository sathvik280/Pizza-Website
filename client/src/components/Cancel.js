import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FaTimesCircle } from 'react-icons/fa';

import { updateIsConnectedToStripe } from '../features/slice/authSlice';

const Cancel = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div 
            className="w-[90%] max-w-[600px] mx-auto bg-primary mt-[25px] rounded-xl flex flex-col items-center py-12 px-2 xs:px-4"
        >
            <div className="text-xl xs:text-2xl text-white text-center">
                The order has been canceled. Please try again
            </div>

            <div className="mt-5">
                <FaTimesCircle size={50} color='white'/>
            </div>

            <button 
                className="text-white underline mt-5 text-center text-lg"
                onClick={ () => {
                    dispatch(updateIsConnectedToStripe(false));
                    
                    navigate('/home', {
                        replace: true
                    });
                }}
            >
                Close
            </button>
        </div>
    );
};

export default Cancel;