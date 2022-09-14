import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalState = (props) => {
  const [Modal, setModal] = useState(false);

  return (
    <GlobalContext.Provider value={{ Modal, setModal }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
export { GlobalContext };
