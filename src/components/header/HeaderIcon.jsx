import { Avatar, Badge } from "antd";
import { useMediaQuery } from "react-responsive";

const HeaderIcon = ({ isdot, children, className }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <Avatar
        size={isSmallScreen ? 35 : 45}
        className={` bg-[#ffffff] ${className}`}>
        <Badge
          dot={isdot}
          color="#4D44B5"
          size="large"
          offset={[-1, 1]}
          className="rounded-full text-[#A098AE] ">
          {children}
        </Badge>
      </Avatar>
    </>
  );
};

export default HeaderIcon;
