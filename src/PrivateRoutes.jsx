import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";


const PrivateRoutes = () => {

  const {loggedIn}=useAuth();

  return loggedIn? <Outlet /> : <Navigate to="/login" />
  
};

export default PrivateRoutes;
