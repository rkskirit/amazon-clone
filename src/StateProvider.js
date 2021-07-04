import React, { createContext, useContext, useReducer } from "react";

//here we are preparing data layer
export const StateContext = createContext();

//wraping our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// pull information about the data layer

export const useStateValue = () => useContext(StateContext);
