import { Avatar } from "antd";
import { useEffect, useRef, useState } from "react";
import AvatarCard from "./AvatarCard";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../context/auth/authProvider";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modelRef = useRef(null);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const { userData } = useAuth();



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && modelRef.current !== event.target) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Avatar
        size={isSmallScreen ? 35 : 45}
        className="bg-[rgb(193,187,235)]"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        src={`http://localhost:3001/uploads/${userData?.avatar}`}
      />
      <AvatarCard isOpen={isOpen} ref={modelRef} />
    </div>
  );
};

export default UserAvatar;
