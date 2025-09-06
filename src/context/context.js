import { createContext } from "react";
//to provide context to all children, 
//first create a context and then wrap all
// the components that need access to that context.
//then inside those components use the usenavigate 
//hook and pass the context 
export const AppContext = createContext();