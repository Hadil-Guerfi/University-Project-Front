import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; 

const authContext = createContext({ userId: null ,token:null});

function AuthProvider({ children }) {
  const [user, setUser] = useState({ userId: null, token: null }); // Initialize user state with userId and token

  const setUserField = ({ field, value }) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value, // Update specified field with new value
    }));
  };

  return (
    <authContext.Provider value={{ user, setUserField }}>
      {children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
