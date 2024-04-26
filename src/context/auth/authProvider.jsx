import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import instance from "../../Utils/requestConfig/axiosInstance";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(undefined);

  async function getLoggedIn() {
    try {
      const loggedInRes = await instance.get("/users/verifyLogIn", {
        withCredentials: true,
      });
      setLoggedIn(loggedInRes.data.data?.currentUser?.user._id);
      setUserData(loggedInRes.data.data?.currentUser?.user);
    } catch (error) {
      console.error("Error fetching logged in status:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getLoggedIn();
  }, []);







  return (
    <AuthContext.Provider
      value={{ loggedIn, getLoggedIn, setLoggedIn, loading, userData,setUserData }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
