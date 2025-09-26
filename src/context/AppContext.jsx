//app context provides the common logic to the components
//import { doctors } from "../assets/assets_frontend/assets";
import { useState } from "react";
import { AppContext } from "./context";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from "react";

const AppContextProvider = (props) => {

  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const[doctors, setDoctors] = useState([]);
  const[userAtoken, setUserAtoken] = useState(localStorage.getItem('accessToken') || '');
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
    
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if(data.success){
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  const loadUserProfileData = async () => {
    
    try {
      
      const { data } = await axios.post(backendUrl + '/api/user/get-user-data', {}, {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${userAtoken}`
        }
      }
    )

      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    getDoctorsData();
  }, [])
/*
  window.addEventListener('reset',() =>{
    //if(userAtoken){
      loadUserProfileData();
   // } else {
      //setUserData(false)
    //}
  })*/
  useEffect(()=>{
    if(userAtoken){
      loadUserProfileData();
    } else {
      setUserData(false)
    }
  }, [userAtoken])

  const value = {
    doctors,
    currencySymbol,
    userAtoken,
    setUserAtoken,
    setUserData,
    userData,
    loadUserProfileData,
    backendUrl
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;