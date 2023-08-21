import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setUpUser, setUpToken } from '../features/slice/authSlice';
import { setUpCart } from '../features/slice/cartSlice';

import { ImSpinner8 } from 'react-icons/im';

import Header2 from '../components/Header2';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('Enter your email and password');
    const [emailShake, setEmailShake] = useState(false);
    const [passwordShake, setPasswordShake] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = () => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/;
        return email.match(validRegex);
    };

    const authenticateUser = async (url) => {
        try 
        {
            const response = await axios.post(url, {
                email,
                password
            });
            const data = await response.data;

            const { user, token } = data; 
            const {
                _id: id,
                name, 
                location, 
                email: userEmail, 
                password: userPassword, 
                cart
            } = user;

            setMessage('Logged in successfully');

            dispatch(setUpUser({
                id,
                name, 
                location, 
                userEmail, 
                userPassword
            }));
            dispatch(setUpCart(cart));

            setTimeout( () => {
                dispatch(setUpToken(token));
                navigate('/home');
            }, 1500);
        }

        catch (error)
        {
            if (error.response === undefined)
            {
                setMessage('Server down, please try again');
                return;
            }

            const errMessage = error.response.data.message;

            if (errMessage.startsWith('Email '))
            {
                setMessage('Email not registered');
                return;
            }

            if (errMessage.startsWith('Wrong '))
            {
                setMessage('Wrong password');
                return;
            }

            setMessage('Error, please try again');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message === '' || message === 'Logged in successfully')
        {
            return;
        }

        if (email === '')
        {
            setEmailShake(true);
            setMessage('Some of the feilds are empty');

            setTimeout( () => {
                setEmailShake(false);
            }, 500);

            return;
        }

        if (!validateEmail())
        {
            setEmailShake(true);
            setMessage('Invalid email address');

            setTimeout( () => {
                setEmailShake(false);
            }, 500);
            
            return;
        }

        if (password === '')
        {
            setPasswordShake(true);
            setMessage('Some of the feilds are empty');

            setTimeout( () => {
                setPasswordShake(false);
            }, 500);

            return;
        }

        if (!navigator.onLine)
        {
            setMessage('Network connection lost');
            return;
        }

        setMessage('');
        authenticateUser('http://localhost:5000/login');
    };

    return (
        <div className="w-full min-h-screen bg-[#F6F6F6] relative pb-[25px]">
            <Header2 />
            
            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white mt-[25px] rounded-xl flex flex-col items-center py-6"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[17px] font-medium text-gray-600">
                    Login to your account
                </div>

                <form className="mt-8 w-full flex flex-col gap-y-6 items-center">
                    <input 
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={ (event) => {
                            setEmail(event.target.value.trim())
                        }}
                        spellCheck={false}
                        className={`focus:outline-none border-[1px] p-[10px] w-[85%] border-gray-400 rounded-md text-[#666666] placeholder:text-[#858585] ${emailShake ? "animate-shake" : "animate-none"}`}
                    />

                    <input 
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={ (event) => {
                            setPassword(event.target.value.trim());
                        }}
                        spellCheck={false}
                        className={`focus:outline-none border-[1px] px-2 py-[10px] w-[85%] border-gray-400 rounded-md text-[#666666] placeholder:text-[#858585] ${passwordShake ? "animate-shake" : "animate-none"}`}
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-[85%] text-white bg-primary py-3 rounded-md"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-gray-600 underline px-2 text-center">
                    <Link to='/register'>
                        Don't have an account? Signup here
                    </Link>
                </div>
            </div>

            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white my-[25px] mb-[50px] rounded-xl flex justify-center items-center py-6"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[18px] text-gray-600 px-2 text-center">
                    {
                        message === '' ? (
                            <ImSpinner8 className="animate-spin text-[27px] text-gray-500"/>
                        ) : (
                            message
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Login;