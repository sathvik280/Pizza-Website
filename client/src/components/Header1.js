import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { FaUser } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

import logo from '../assets/img/logo.svg';
import bag from '../assets/img/bag.svg';

import { removeUser, removeToken } from '../features/slice/authSlice';
import { updateCountTotal } from '../features/slice/cartSlice';
import { handleClose, handleOpen } from '../features/slice/sidebarSlice';
import { removePizzas } from '../features/slice/pizzaSlice';

const Header1 = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { cartCount, cartItems } = useSelector( (store) => store.cart);
    const { user, token } = useSelector( (store) => store.auth);

    const saveUserCartToDb = async (url) => {
        try 
        {
            await axios.patch(url,
                {
                    userId: user.id, 
                    newCart: [...cartItems]
                }, 
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
        }

        catch (error)
        {
            console.log('Server error');
        }
    };

    const logoutUser = () => {
        if (isLoading)
        {
            return;
        }
        
        setIsLoading(true);
        saveUserCartToDb('http://localhost:5000/user');

        setTimeout( () => {
            navigate('/');
            setIsLoading(false);

            dispatch(removePizzas());
            dispatch(removeUser());
            dispatch(removeToken());
        }, 1000);
    };

    useEffect( () => {
        dispatch(updateCountTotal());
    }, [cartItems]);

    return (
        <div className="w-full bg-primary shadow-md sticky top-0 left-0 right-0 z-10">
            <div className="flex flex-row items-center justify-between px-4 xs:px-6 md:px-8 lg:px-10 py-8 max-w-[1024px] mx-auto">
                <div
                    className="cursor-pointer"
                    onClick={ () => {
                        if (pathname === '/home')
                        {
                            window.scrollTo( {top: 0, behavior: 'smooth'} );
                        }

                        else 
                        {
                            dispatch(handleClose());
                            navigate('/home');
                        }
                    }}
                >
                    <img 
                        src={logo} 
                        alt="" 
                        className="w-[80%] xs:w-full"
                    />
                </div>

                <div className="flex flex-row items-center gap-x-6 xs:gap-x-8 md:gap-x-10 relative">
                    <div 
                        className="p-1 cursor-pointer relative"
                        onClick={ () => {
                            if (pathname === '/checkout')
                            {
                                return;
                            }
                            
                            dispatch(handleOpen());
                            saveUserCartToDb('http://localhost:5000/user');
                        }}
                    >
                        <img 
                            src={bag} 
                            alt="" 
                            className="w-[92%] xs:w-full"
                        />

                        <div className="absolute -right-1 -bottom-[8px] text-[12px] w-[22px] h-[22px] rounded-full bg-black text-white flex items-center justify-center">
                            {cartCount}
                        </div>
                    </div>

                    <div
                        className="cursor-pointer"
                        onClick={ () => {
                            setIsActive(!isActive);
                        }}
                    >
                        <FaUser className="text-[#ffa323] text-[24px] xs:text-[26px]"/>
                    </div>

                    <div 
                        className={`${isActive ? "flex" : "hidden"} items-center justify-normal cursor-pointer absolute bg-[#fcede3] p-3 right-0 top-[40px] h-[40px]`}
                        onClick={logoutUser}
                    >
                        {
                            isLoading ?
                            <ImSpinner8 className="w-[52px] animate-spin text-lg"/> :
                            "Logout"
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header1;