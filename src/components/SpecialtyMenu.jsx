//import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const SpecialtyMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800 overflow-hidden' id='specialty'>
      <h1 className='text-3xl font-medium'>Find  by specialty</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simpy browse through our extensive list of trusted doctors and schedule your appointment hassle free</p>
      <div className='flex sm:justify-center gap-4 pt-5 overflow-scroll w-full'>
          {specialityData.map((specialty, i) => (
              <Link onClick={()=>{scrollTo(0,0)}} className='flex flex-col items-center text-xs
                cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' 
                key={i} to={`/doctors/${specialty.speciality}`}>
                  <img className='w-16 sm:w-20 mb-2' src={specialty.image} alt="" />
                  <p>{specialty.speciality}</p>
              </Link>
          ))}
      </div>
    </div>
  )
}

export default SpecialtyMenu;