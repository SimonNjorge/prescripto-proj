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

  useEffect(()=>{
    getDoctorsData();
  }, [])

    const value = {
      doctors,
      currencySymbol,
      userAtoken,
      setUserAtoken,
      backendUrl
    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;