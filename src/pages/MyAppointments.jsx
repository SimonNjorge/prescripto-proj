import React, { useContext } from 'react'
import { AppContext } from '../context/context'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className='pb-3 mt-10 text-zinc-700 font-medium border-b'>My Appointments</p>
      {doctors.slice(0,2).map((doc, i)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={i}>
          <div className='w-32 bg-indigo-50'>
            <img src={doc.image} alt="" />
          </div>
          <div className='flex-1 text-zinc-700 text-sm'>
            <p className='text-zinc-800 font-semibold'>{doc.name}</p>
            <p>{doc.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{doc.address.line1}</p>
            <p className='text-xs'>{doc.address.line2}</p>
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 23rd September, 2025 | 8:00pm</p>
          </div>
          <div></div>
          <div className='flex flex-col justify-end gap-2'>
            <button className='text-sm text-stone-500 text-center sm:max-w-48 border py-2 hover:bg-primary hover:text-white transition-all duration-500'>Pay online</button>
            <button className='text-sm text-stone-500 text-center sm:max-w-48 border p-2  hover:bg-red-600 hover:text-white transition-all duration-500'>Cancel Appointment</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAppointments