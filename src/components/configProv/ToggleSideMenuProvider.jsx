import { createContext, useState, useContext } from "react";
const ToggleButonContext = createContext();

const ToggleSideMenuProvider = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const handelCollapse = () => {
    setCollapse((prev) => !prev);
  };
  return (
    <ToggleButonContext.Provider value={{collapse, handelCollapse,setCollapse}}>
      {children}
    </ToggleButonContext.Provider>
  );
};

export default ToggleSideMenuProvider;

export const useToggleButton = () => {
  return useContext(ToggleButonContext);
};
