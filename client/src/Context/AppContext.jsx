import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

     const [view, setView] = useState(false);

      const value = {
         view, setView
      };

      return (
         <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
      );
};