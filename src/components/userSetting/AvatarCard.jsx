import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import  { forwardRef } from "react";
import { useLogout } from "./LogoutApi";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authProvider";

const AvatarCard = forwardRef((props, ref) => {
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { isOpen } = props;
  const onSucessLogout = (data)=>{
    console.log(data.data.message);
    setLoggedIn(undefined);
    <Navigate to="/login" />
  }
  const onErrorLogout = (err)=> {
    
  }
  const {mutate: uselogout} = useLogout(onSucessLogout,onErrorLogout);
  const deconnecter = ()=>{
    uselogout();
  }
  return (
      <div
          ref={ref}
      className={`bg-white rounded-xl absolute z-20 right-[-20px] top-[120%] text-[#303972] pl-7 pr-9 py-5 transition-all ${
        isOpen ? "" : "hidden"
      }`}>
      <div className=" flex gap-3 cursor-pointer mb-2 " onClick={()=>deconnecter()}>
        <LogoutOutlined />
        <span>Deconnecté</span>
      </div>{" "}
      <div className=" flex gap-3 cursor-pointer ">
        <UserOutlined />
        <span>Profile</span>
      </div>
    </div>
  );
});

export default AvatarCard;
