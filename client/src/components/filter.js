import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { applyFilter, setPizzas } from '../features/slice/pizzaSlice';

const Filter = (props) => {
    const { selectedFilter } = useSelector( (store) => store.pizza );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(setPizzas());
    }, [selectedFilter]);

    return (
        <div className="mx-auto max-w-[768px] flex items-center justify-center py-20">
            <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:px-[30px] lg:px-6 items-center w-[85%] max-w-[320px] md:max-w-none md:w-full">
                <button
                    className={`w-full md:w-[225px] lg:w-[230px] h-[75px] border border-primary text-[25px] ${selectedFilter === "all" ? "bg-primary text-white" : "bg-white text-primary"}`}
                    style={ {fontFamily: "'Bangers', cursive"} }
                    onClick={ () => {
                        dispatch(applyFilter('all'));
                    }}
                >
                    All pizzas
                </button>

                <button
                    className={`w-full md:w-[225px] lg:w-[230px] h-[75px] border border-primary text-[25px] ${selectedFilter === "veg" ? "bg-primary text-white" : "bg-white text-primary"}`}
                    style={ {fontFamily: "'Bangers', cursive"} }
                    onClick={ () => {
                        dispatch(applyFilter('veg'));
                    }}
                >
                    Veg pizzas
                </button>

                <button
                    className={`w-full md:w-[225px] lg:w-[230px] h-[75px] border border-primary text-[25px] ${selectedFilter === "nonveg" ? "bg-primary text-white" : "bg-white text-primary"}`}
                    style={ {fontFamily: "'Bangers', cursive"} }
                    onClick={ () => {
                        dispatch(applyFilter('nonveg'));
                    }}
                >
                    Non-veg pizzas
                </button>
            </div>
        </div>
    );
};

export default Filter;