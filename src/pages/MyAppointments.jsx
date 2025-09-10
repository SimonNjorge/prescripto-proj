import React, { useContext } from 'react'
import { AppContext } from '../context/context'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p>My Appointments</p>
      {doctors.slice(0,2).map((doc, i)=>(
        <div key={i}>
          <div>
            <img src={doc.image} alt="" />
          </div>
          <div>
            <p>{doc.name}</p>
            <p>{doc.speciality}</p>
            <p>Address:</p>
            <p>{doc.address.line1}</p>
            <p>{doc.address.line2}</p>
            <p><span>Date & Time:</span> 23rd September, 2025 | 8:00pm</p>
          </div>
          <div></div>
          <div>
            <button>Pay online</button>
            <button>Cancel Appointment</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAppointments