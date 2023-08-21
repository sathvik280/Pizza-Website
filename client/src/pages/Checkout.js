import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { ImSpinner8 } from 'react-icons/im';

import Header1 from '../components/Header1';

import { updateIsConnectedToStripe } from '../features/slice/authSlice';

const Checkout = (props) => {
    const { user, token } = useSelector( (store) => store.auth );
    const { cartCount, cartTotal, cartItems } = useSelector( (store) => store.cart );

    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const [phoneNumberShake, setPhoneNumberShake] = useState(false);
    const [streetShake, setStreetShake] = useState(false);
    const [cityShake, setCityShake] = useState(false);
    const [postalCodeShake, setPostalCodeShake] = useState(false);
    const [countryShake, setCountryShake] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const connectToStripe = async (url) => {
        try 
        {
            const response = await axios.post(url,
                {
                    items: cartItems
                },
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
            const data = await response.data;

            setIsLoading(false);
            dispatch(updateIsConnectedToStripe(true));

            window.location.href = data.url;            
        }

        catch (error)
        {
            setIsLoading(false);
            console.log('Server error');
        }
    };

    const handleSubmit = () => {
        if (isLoading)
        {
            return;
        }

        if (phoneNumber === '' || phoneNumber.length < 10)
        {
            setPhoneNumberShake(true);

            setTimeout( () => {
                setPhoneNumberShake(false);
            }, 500);

            return;
        }

        if (street === '')
        {
            setStreetShake(true);

            setTimeout( () => {
                setStreetShake(false);
            }, 500);

            return;
        }

        if (city === '')
        {
            setCityShake(true);

            setTimeout( () => {
                setCityShake(false);
            }, 500);

            return;
        }

        if (postalCode === '')
        {
            setPostalCodeShake(true);

            setTimeout( () => {
                setPostalCodeShake(false);
            }, 500);

            return;
        }

        if (country === '')
        {
            setCountryShake(true);

            setTimeout( () => {
                setCountryShake(false);
            }, 500);

            return;
        }

        setIsLoading(true);
        connectToStripe('http://localhost:5000/payment');
    };

    return (
        <div className="w-full min-h-screen">
            <Header1 />

            <div className="flex flex-col gap-y-12 lg:flex-row lg:gap-x-8 items-center lg:items-start w-full max-w-[1024px] mx-auto pt-16 pb-20 px-4 xs:px-6 md:px-10 lg:px-12">
                <div className="flex flex-col gap-y-7 w-full lg:w-[60%]">
                    <div className="text-lg font-medium">
                        Billing Address
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3`}
                            value={user.name}
                            disabled
                        />

                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3`}
                            value={user.userEmail}
                            disabled
                        />

                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3 ${phoneNumberShake ? "animate-shake" : "animate-none"}`}
                            placeholder='Phone number'
                            value={phoneNumber}
                            spellCheck={false}
                            onChange={ (event) => {
                                const input = event.target.value;

                                if (input.length > 10)
                                {
                                    return;
                                }

                                const numericInput = input.replace(/\D/g, '');
                                setPhoneNumber(numericInput);
                            }}
                        />

                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3 ${streetShake ? "animate-shake" : "animate-none"}`}
                            placeholder='Street address'
                            value={street}
                            spellCheck={false}
                            onChange={ (event) => {
                                setStreet(event.target.value);
                            }}
                            onBlur={ () => {
                                setStreet(street.trim());
                            }}
                        />

                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3 ${cityShake ? "animate-shake" : "animate-none"}`}
                            placeholder='City'
                            value={city}
                            spellCheck={false}
                            onChange={ (event) => {
                                setCity(event.target.value);
                            }}
                            onBlur={ () => {
                                setCity(city.trim());
                            }}
                        />

                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3 ${postalCodeShake ? "animate-shake" : "animate-none"}`}
                            placeholder='Postal code'
                            value={postalCode}
                            spellCheck={false}
                            onChange={ (event) => {
                                setPostalCode(event.target.value);
                            }}
                            onBlur={ () => {
                                setPostalCode(postalCode.trim());
                            }}
                        />

                        <input 
                            type="text"
                            className={`focus:outline-none border border-gray-500 rounded-md max-w-[500px] px-4 py-3 ${countryShake ? "animate-shake" : "animate-none"}`}
                            placeholder='Country'
                            value={country}
                            spellCheck={false}
                            onChange={ (event) => {
                                setCountry(event.target.value);
                            }}
                            onBlur={ () => {
                                setCountry(country.trim());
                            }}
                        />
                    </div>
                </div>

                <div className="w-full max-w-[400px] bg-primary p-5 rounded-md lg:mt-4">
                    <div className="flex flex-row items-center justify-between text-white">
                        <div>
                            Total Qty
                        </div>

                        <div>
                            {cartCount}
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between text-white mt-3">
                        <div>
                            Subtotal
                        </div>

                        <div>
                            ₹ {cartTotal}
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between text-white mt-3">
                        <div>
                            Shipping 
                        </div>

                        <div>
                            ₹ 100
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-white my-4">
                    </div>

                    <div className="flex flex-row items-center justify-between text-white">
                        <div className="text-xl">
                            Total 
                        </div>

                        <div>
                            ₹ { (Number(cartTotal) + 100).toFixed(2) }
                        </div>
                    </div>

                    <button
                        className="bg-white py-2 text-black mt-6 rounded-sm w-full flex items-center justify-center"
                        onClick={handleSubmit}
                    >
                        {
                            isLoading ?
                            <ImSpinner8 className="animate-spin my-[1px]" size={22}/> :
                            "Place Order"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;