import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import instance from "./axiosInstance";

const AuthContext = createContext();

function AuthProvider({children}) {
    
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [loading, setLoading] = useState(true);


  async function getLoggedIn() {
    try {
      const loggedInRes = await instance.get("/auth/verifyLogIn", {
        withCredentials: true,
      });
      setLoggedIn(loggedInRes.data.data.currentUser.user._id);
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
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, setLoggedIn }}>
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

/*The `getLoggedIn` function inside `AuthProvider` is called whenever the `AuthProvider` component is mounted due to the `useEffect` hook. 

The `useEffect` hook with an empty dependency array `[]` runs once after the initial render of the component.

In your `App` component, `AuthProvider` wraps all your routes, so it mounts when your app loads. 

This means `getLoggedIn` is called once when the app loads.

However, `getLoggedIn` is not called each time you try to open a route.

This is because navigating between routes does not unmount and remount the `AuthProvider` component.

The `AuthProvider` stays mounted as long as your app is loaded, and its state persists across route changes.

So, in summary, `getLoggedIn` is called once when the app loads, and not on every route change. If you want to call `getLoggedIn` on specific route changes, you would need to add additional logic to do so. For example, you could pass a prop to `AuthProvider` that changes on specific route changes, and include that prop in the dependency array of the `useEffect` hook. But be careful with this approach, as it could lead to unnecessary network requests. It's usually better to manage user authentication state globally and efficiently, as you're doing with `AuthProvider`. 

 */
