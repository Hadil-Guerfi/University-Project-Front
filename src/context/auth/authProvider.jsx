import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import instance from "../../Utils/requestConfig/axiosInstance";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getLoggedIn() {
    setLoading(true); 

    try {
      const loggedInRes = await instance.get("/users/verifyLogIn", {
        withCredentials: true,
      });
      // console.log(loggedInRes);
      setLoggedIn(loggedInRes.data.data?.currentUser?.user._id);
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
      value={{ loggedIn, getLoggedIn, setLoggedIn, loading }}>
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
