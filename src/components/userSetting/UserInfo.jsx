import { useAuth } from "../../context/auth/authProvider";

const UserInfo = () => {

  const {userData}=useAuth()

  return (
    <div className="max-md:hidden">
      <span className="text-[#303972] font-medium">
        {userData?.nom} {userData?.prenom}
      </span>
      <br />
      <span className="text-[#A098AE]">{userData?.__t}</span>
    </div>
  );
};

export default UserInfo;
