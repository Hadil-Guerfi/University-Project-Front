import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";


const PrivateRoutes = () => {

  const {loggedIn}=useAuth();

  console.log(loggedIn)

  return loggedIn? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
