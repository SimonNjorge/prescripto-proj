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
            Welcome to prescripto, your trusted partner in managing your healthcare needs. 
            Here at prescripto we offer you a state of the art services in booking appointments 
            with our experienced and reliable doctors.
          </p>
          <p>
            Prescripto is committed to excellence in health 
            technology by ensuring that our patients always get the best.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision is to provide a seamless health experience
            for everyone ensuring that access to healthcare is easy.
          </p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>
           WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row justify-center mb-10 gap-6'> 
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 cursor-pointer hover:bg-primary hover:text-white transition-all duration-500' >
          <b>Efficiency:</b>
          <p>
            Streamlined appointment booking that fits
            into your busy lifestyle
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 cursor-pointer hover:bg-primary hover:text-white transition-all duration-500'>
          <b>Convenience:</b>
          <p>
            Access to a network of trusted health 
            professionals near you.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 cursor-pointer hover:bg-primary hover:text-white transition-all duration-500'>
          <b>Personalisation</b>
          <p>
            Tailored recommendations and 
            reminders to help you stay on top of your health
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;