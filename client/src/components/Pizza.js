import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pizza = (props) => {
    const { pizza } = props;
    const {
        _id,
        pizzaName,
        imageUrl,
        shortDesc,
        priceSm,
        category
    } = pizza;

    const navigate = useNavigate();

    return (
        <div
            className="max-w-[320px] md:max-w-none mx-auto cursor-default py-5 bg-white"
            style={ {boxShadow: '0px 0px 8px 0px lightgrey'} }
        >
            <div className="flex flex-col gap-y-4 items-center w-[90%] mx-auto">
                <div>
                    <img 
                        className="min-h-[223px] xs:min-h-[280px]" 
                        src={imageUrl} 
                        alt="" 
                    />
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between mb-3">
                        <h2 className="text-2xl font-primary font-semibold tracking-[1px] text-black capitalize">
                            {pizzaName}
                        </h2>

                        <div className={`w-[25px] h-[25px] border flex items-center justify-center mr-2 ${category === "veg" ? "border-green-500" : "border-red-500"}`}>
                            <div className={`w-[10px] h-[10px] rounded-full ${category === "veg" ? "bg-green-500" : "bg-red-500"}`}>
                            </div>
                        </div>
                    </div>

                    <div className="font-primary mb-5">
                        {shortDesc}
                    </div>

                    <div className="flex flex-row items-center justify-between w-[97%]">
                        <div className="text-lg">
                            Starts at ₹{priceSm}
                        </div>

                        <button 
                            className="gradient rounded-lg py-[10px] px-4 xs:px-5 font-semibold mb-2"
                            onClick={ () => {
                                navigate(`/pizza/${_id}`, {
                                    state: {
                                        from: 'home' 
                                    }
                                });
                            }}
                        >
                            Choose
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pizza;