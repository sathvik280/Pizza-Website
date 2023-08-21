import React from 'react';

import pizzaImg from '../assets/img/pizza-banner.png';

const Banner = (props) => {
    return (
        <div className="pt-14 lg:pt-8 pb-10 bg-pattern bg-primary">
            <div className="flex flex-col lg:flex-row gap-y-5 items-center justify-center lg:justify-between px-4 xs:px-6 md:px-8 lg:px-10 max-w-[1024px] mx-auto">
                <div className="w-full lg:w-[50%] text-center lg:text-left">
                    <div 
                        className="uppercase text-[25px] md:text-[30px] lg:text-[30px] mb-1 text-white" 
                        style={ {fontFamily: "'Bangers', cursive"} }
                    >
                        Best pizza in town
                    </div>

                    <div 
                        className="uppercase text-[40px] xs:text-[45px] md:text-[58px] lg:text-[62px] leading-[1] text-white" 
                        style={ {fontFamily: "'Bangers', cursive"} }
                    >
                        Pizza Perfection <br/>
                        in every bite
                    </div>
                </div>

                <div className="relative w-[90%] xs:w-[300px] md:w-[380px] lg:w-[450px]">
                    <img 
                        className="min-h-[240px] xs:min-h-[321px] md:min-h-[406px] lg:min-h-[481px]" 
                        src={pizzaImg}
                        alt="" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;