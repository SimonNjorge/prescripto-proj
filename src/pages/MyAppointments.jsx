import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context'
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {

  const { userAtoken, backendUrl, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getAppointments = async () => {

    try {
      
      const { data } = await axios.post(backendUrl + '/api/user/appointments', {}, {
        headers: {
          'Authorization' : `Bearer ${userAtoken}`
        }
      });

      if (data.success) {        
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const cancelAppointment = async (appointmentId) => {
    try {
      
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', {
        appointmentId 
        },{
          headers:{
            'Authorization': `Bearer ${userAtoken}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message);
        getAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment payment',
      description: 'Appointment payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          
          const { data } = axios.post(backendUrl + '/api/user/verify-razorpay',
            {
            razorpay_order_id : response.razorpay_order_id
            },{
            headers: {
              'Authorization': `Bearer ${userAtoken}`
            }
            }
          );

          if(data.success) {
            getAppointments();
            navigate('/my-appointments');
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }

        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options);
    //open razorpay gui to make the payment
    rzp.open();
  }

  const payForAppointment = async (appointmentId) => {
    try {
      
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', {
          appointmentId
        },{
          headers: {
            'Authorization': `Bearer ${userAtoken}`
          }
        }
      )

      if (data.success) {
        console.log(data.order)
        initPay(data.order)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatSlotDate = (slotDate) => {
    let dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + ' ' + dateArray[2]
  }

  useEffect(()=>{
    if(userAtoken) {
      getAppointments()
    }
  }, [userAtoken]);

  return (
    <div>
      <p className='pb-3 mt-10 text-zinc-700 font-medium border-b'>My Appointments</p>
      {appointments.map((appnmnt, i)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={i}>
          <div className='w-32 bg-indigo-50'>
            <img src={appnmnt.docData.image} alt="" />
          </div>
          <div className='flex-1 text-zinc-700 text-sm'>
            <p className='text-zinc-800 font-semibold'>{appnmnt.docData.name}</p>
            <p>{appnmnt.docData.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{appnmnt.docData.address.line1}</p>
            <p className='text-xs'>{appnmnt.docData.address.line2}</p>
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {formatSlotDate(appnmnt.slotDate)} | {appnmnt.slotTime}</p>
          </div>
          <div></div>
          <div className='flex flex-col justify-end gap-2'>
            {!appnmnt.cancelled && appnmnt.payment && !appnmnt.isCompleted && <button className='sm:min-w-48 py-1 px-2 text-green-500 font-medium'>Paid</button>}
            {!appnmnt.cancelled && !appnmnt.payment && !appnmnt.isCompleted && <button onClick={()=>payForAppointment(appnmnt._id)} className='text-sm text-stone-500 text-center sm:max-w-48 border py-2 hover:bg-primary hover:text-white transition-all duration-500'>Pay online</button>}
            {!appnmnt.cancelled && !appnmnt.isCompleted &&  <button onClick={()=>cancelAppointment(appnmnt._id)} className='text-sm text-stone-500 text-center sm:max-w-48 border p-2  hover:bg-red-600 hover:text-white transition-all duration-500'>Cancel Appointment</button>}
            {appnmnt.cancelled && !appnmnt.isCompleted && <button className='sm:min-w-48 border border-red p-2 rounded text-red-700'>Appointment Cancelled</button>}
            {appnmnt.isCompleted && <button className='sm:min-w-48 border border-green-500 p-2 rounded text-green-700'>Completed</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAppointments