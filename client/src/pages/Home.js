import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { ImSpinner8 } from 'react-icons/im';

import Header1 from '../components/Header1';
import Banner from '../components/Banner';
import Filter from '../components/filter';
import Pizza from '../components/Pizza';
import Success from '../components/Success';
import Cancel from '../components/Cancel';

import { setPizzasData } from '../features/slice/pizzaSlice';

const Home = (props) => {
    const { pizzas, isPizzasFetched } = useSelector( (store) => store.pizza );
    const { token, isConnectedToStripe } = useSelector( (store) => store.auth);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('paymentStatus');

    const dispatch = useDispatch();

    const fetchPizzas = async (url) => {
        try 
        {
            const response = await axios.get(url, {
                headers: {
                    'authorization': token
                }
            });
            const data = await response.data;

            dispatch(setPizzasData(data));
        }

        catch (error)
        {
            console.log('Server error');
        }
    };

    useEffect( () => {
        if (isPizzasFetched)
        {
            return;
        }
        
        fetchPizzas('http://localhost:5000/pizza');
    }, []);

    return (
        <div className="w-full min-h-screen">
            <Header1 />

            {
                (isConnectedToStripe && paymentStatus && (paymentStatus === 'success' || paymentStatus === 'cancel'))
                &&
                <div className="fixed h-screen bg-black/90 top-0 w-full z-50 flex items-center justify-center">
                    {
                        paymentStatus === 'success' ?
                        <Success /> : 
                        <Cancel />
                    }
                </div>
            }

            <Banner />
            <Filter />

            <div className="pb-20">
                {
                    pizzas.length === 0 
                    ?
                    <div className="flex items-center justify-center py-5">
                        <ImSpinner8 className="animate-spin text-3xl md:text-4xl text-primary"/>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] max-w-[1024px] mx-auto px-4 xs:px-6 md:px-8 pb-1">
                        {
                            pizzas.map( (pizza) => {
                                return (
                                    <div key={pizza._id}>
                                        <Pizza pizza={pizza} />
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;