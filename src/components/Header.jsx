import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/*--left side --*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
            <p className='text-3xl md:text-4xl 2xl:text-5xl text-white font-semibold leading-tight'>
                Book appointment <br /> with trusted doctors
            </p>
            <div className='flex flex-col items-center gap-3 md:flex-row text-sm text-white font-light' >
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>simply browse through our list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle free </p>
            </div>
            <a href="#specialty" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book appointment <img src={assets.arrow_icon} className='w-3' alt="" />
            </a>
        </div>
        {/*--right side --*/}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header;