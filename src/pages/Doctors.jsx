import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/context';

const Doctors = () => {
  const { specialty } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate();

  const applyFilter = () => {
    if(specialty){
      setFilteredDocs(doctors.filter(doc => doc.speciality === specialty))
    } else{
      setFilteredDocs(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, specialty]);

  return (
    <div>
      <p>Browse through the doctors specialty list</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`px-3 py-1 border rounded transition-all sm:hidden ${showFilters ? "bg-primary text-white" : ''}`} onClick={()=>{setShowFilters(prev => !prev)}}>
          Filters
        </button>
        <div className={`flex-col gap-4 text-gray-600 ${showFilters ? 'flex' : 'hidden sm:flex' }`}>
          <p onClick={()=>{specialty === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={()=>{specialty === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={()=>{specialty === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=>{specialty === 'Paediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={()=>{specialty === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={()=>{specialty === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filteredDocs.map((doctor, i) => (
            <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={i}>
              <img className='bg-blue-50' src={doctor.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-gray-900 font-medium'>{doctor.name}</p>
                <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors