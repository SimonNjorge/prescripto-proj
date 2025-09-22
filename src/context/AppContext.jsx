//app context provides the common logic to the components
//import { doctors } from "../assets/assets_frontend/assets";
import { useState } from "react";
import { AppContext } from "./context";
import axios from 'axios';

const AppContextProvider = (props) => {
  const currencySymbol = '$';

  const[doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorsData = async () => {
    try {
    
      const {data} = await axios.post(backendUrl + '/api/admin/all-doctors')

    } catch (error) {
      
    }
  }

    const value = {
      //doctors,
      currencySymbol
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;