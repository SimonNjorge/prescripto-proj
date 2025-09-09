import React from 'react'
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>Us</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 my-10'>
        <img className='w-full md:max-w-[360px]'  src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-5 text-sm text-gray-600 md:w-1/2'>
          <p>
            Welcome to prescripto, your trusted partner in managing your healthcare needs
          </p>
          <p>
            Prescripto is committed to excellence in health 
            technology.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision is to provide a seamless health experience
            for everyone ensuring that access to healthcare is easy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;