import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets"

const Banner = () => {

    const navigate = useNavigate();

  return (
    <div className="flex  bg-primary rounded-lg px-6 sm:px-10 md:px-14 my-20 md:mx-10">
        {/*--left side--*/}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
            <div className="text-xl sm:2xl md:text-3xl lg:text-4xl font-semibold text-white">
                <p className="">
                    Book Appointment 
                </p>
                <p className="mt-4">With 100+ Trusted Doctors</p>
            </div>
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="text-gray-600 font-light px-6 py-3 rounded-full mt-4 bg-white hover:scale-105 transition-all duration-500" >
                create account
            </button>
        </div>
        {/*--right side--*/}
        <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
            <img className='w-full absolute right-0 bottom-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner;