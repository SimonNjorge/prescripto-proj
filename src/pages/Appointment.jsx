import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/context';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios'

const Appointment = () => {

  const {docId} = useParams();
  const navigate = useNavigate();

  const { doctors, currencySymbol, userAtoken, backendUrl, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [booking, setBooking] = useState(false); 
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchDocInfo =  async () => {
    const docInfo = doctors.find(doc => doc._id == docId);
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    //get the current date
    let today = new Date();

    for(let i = 0; i < 7; i++){
      let currentDate = new Date(today);
      //console.log(currentDate)
      //setDate sets the numeric day of the month using local time
      //getDate gets the numeric day of the month using local time
      currentDate.setDate(today.getDate() + i);

      //setting end time of the day with index
      let endTime = new Date();
      //adds one day to the current date
      endTime.setDate(today.getDate() + i);
      //adds 21 hours to the current date
      endTime.setHours(21, 0, 0, 0);
      //console.log(endTime);
      //console.log(endTime.setHours(21,0,0,0));
     //setting hours

     if(currentDate.getDate() == today.getDate()){
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
     } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0)
     }

     let timeSlots = [];

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
        
        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })
        }

        //increment current time by 30mins
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!userAtoken) {
      toast.warn("Login to book an appointment");
      return navigate('/login')
    }

    if (!booking) {
      try {
        setBooking(true);
        /*
        await new Promise((resolve, reject) => {
          setTimeout(()=>{
          reject({message: 'failed'})
        }, 12000)}).catch(console.log)
        */
       
        const date = docSlots[slotIndex][0].dateTime;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        
        const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {
            docId,
            slotDate,
            slotTime
          },{
            headers: {
              'Authorization' : `Bearer ${userAtoken}`
            }
          }
        )

        if (data.success) {
          toast.success(data.message)
          getDoctorsData()
          navigate('/my-appointments')
        } else {
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      } finally {
        setBooking(false)
      }
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(()=>{
    getAvailableSlots()
  }, [docInfo]);

  /*
  useEffect(()=>{
    console.log(docSlots)
  }, [docSlots]);*/

  return docInfo && (
    <div>
      {/*-- doctors details --*/}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl text-gray-900 font-medium'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border rounded-full text-xs'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/*-- booking slots --*/}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center overflow-x-scroll mt-4 w-full'>
          {docSlots.length && docSlots.map((slots, i)=>(
            <div onClick={()=>setSlotIndex(i)} className={`text-center py-6 rounded-full min-w-16 ${i == slotIndex ? "bg-primary text-white" : "border border-gray-200"}`} key={i}>
              <p >{slots[0] && weekDays[slots[0].dateTime.getDay()]}</p>
              <p className='text-sm'>{slots[0] && slots[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex gap-3 items-center overflow-x-scroll mt-4 w-full'>
          {docSlots.length && docSlots[slotIndex].map((slot, i)=>(
            <p onClick={()=>setSlotTime(slot.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time == slotTime ? "bg-primary text-white" : "text-gray-500 border border-gray-300"}`} key={i}>
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white font-light text-sm px-14 py-3 my-7 rounded-full hover:bg-blue-400'>
          {booking
           ? <div className='flex items-center'>
               <p className='loading mr-1'></p>
                Booking...
              </div>
           : 'book an appointment'
          }
        </button>
      </div>

      {/*-- listing related doctors --*/}
      <RelatedDoctors docId={docId} specialty={docInfo.speciality}/>
    </div>
  )
}

export default Appointment;