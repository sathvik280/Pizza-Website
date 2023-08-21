import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MdCheckCircle } from 'react-icons/md';

import { setUpCart } from '../features/slice/cartSlice';
import { updateIsConnectedToStripe } from '../features/slice/authSlice';

const Success = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    return (
        <div 
            className="w-[90%] max-w-[600px] mx-auto bg-primary mt-[25px] rounded-xl flex flex-col items-center py-12 px-2 xs:px-4"
        >
            <div className="text-xl xs:text-2xl text-white text-center">
                Thank you. The order has been placed
            </div>

            <div className="mt-5">
                <MdCheckCircle size={50} color='white'/>
            </div>

            <button 
                className="text-white underline mt-5 text-center text-lg"
                onClick={ () => {
                    dispatch(updateIsConnectedToStripe(false));
                    dispatch(setUpCart([]));

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

export default Success;