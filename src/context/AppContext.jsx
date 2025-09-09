//app context provides the common logic to the components
import { doctors } from "../assets/assets_frontend/assets";
import { AppContext } from "./context";

const AppContextProvider = (props) => {
  const currencySymbol = '$';
    const value = {
      doctors,
      currencySymbol
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;