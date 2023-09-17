import React, { createContext, useState } from 'react';

// Create a new context
export const Context = createContext();

// Create a ContextProvider component to wrap your app with
export const ContextProvider = ({ children }) => {
  // Define your context values and state here
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();

  // Define functions to update check-in and check-out dates
  const updateCheckIn = (newCheckIn) => {
    setCheckIn(newCheckIn);
  };

  const updateCheckOut = (newCheckOut) => {
    setCheckOut(newCheckOut);
  };

  // Provide the context values to the children components
  const contextValues = {
    checkIn,
    checkOut,
    updateCheckIn, // Define your update function
    updateCheckOut, // Define your update function
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};
