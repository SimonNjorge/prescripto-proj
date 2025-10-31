import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { userAtoken, setUserAtoken, userData } = useContext(AppContext);
  //const [token, setToken] = useState(true);

  const logout = () => {
    setUserAtoken(false); 
    localStorage.removeItem('accessToken')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4' >
      <img onClick={()=>navigate('/')}  className='w-44 max-sm:w-32' src={assets.logo}/>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li  className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto  hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>All Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1 '>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          userAtoken ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 h-8 object-contain border border-slate-300 rounded-full' src={userData.image} alt="profile-pic" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-8 right-1 pt-14 text-base font-medium text-gray-600 z-20 bg-indigo-50 hidden group-hover:block'>
              <div className='min-w-48 flex flex-col gap-4 p-4'>
                <p onClick={()=>{navigate('my-profile')}} className='hover:text-black cursor-pointer'>My profile</p>
                <p onClick={()=>{navigate('my-appointments')}} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
          : <button className='bg-primary text-white rounded-full px-8 py-3 font-light max-sm:text-xs max-sm:p-1 md:block'
              onClick={()=> {navigate('/login')}}>
              Create account
            </button>
        }
        <img className='w-6 md:hidden' onClick={()=>{setShowMenu(true)}} src={assets.menu_icon} alt="" />

        {/*-- mobile menu --*/}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden flex flex-col right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all duration-200`}>
          <div className='flex items-center justify-between px-5 py-2'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-6 cursor-pointer' onClick={()=>{setShowMenu(false)}} src={assets.cross_icon} alt="" />
          </div>
          <ul className='self-center flex flex-col gap-3 mt-4 font-medium text-lg'>
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='text-center px-4 py-2'>HOME</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='text-center px-4 py-2'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='text-center px-4 py-2'>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='text-center px-4 py-2'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;