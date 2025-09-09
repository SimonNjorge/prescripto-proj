import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contacts = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-10 text-gray-500'>
        <p>CONTACT <span className='font-semibold text-gray-700'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col gap-6 items-start'>
          <p className='font-semibold text-gray-600 text-lg'>
            Our OFFICE
          </p>
          <p className='text-gray-500'> 54709 Kapols Corner <br /> Suite 200, Nairobi Kenya</p>
          <p className='text-gray-500'>Tel: +254-7-41-404-115 <br /> Email: simonnjoroge806@gmail.com</p>
          <p className='font-semibold text-gray-600 text-lg'>Careers at PRESCRIPTO</p>
          <p>Learn more about our teams and job openings</p>
          <button className='text-sm px-8 py-4 border border-black hover:text-white hover:bg-black transition-all duration-500'>
            Explore jobs
          </button>
        </div>

      </div>

    </div>
  )
}

export default Contacts