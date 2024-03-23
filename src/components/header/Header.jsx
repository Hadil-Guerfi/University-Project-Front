import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router";
import UserAvatar from "../userSetting/UserAvatar";
import UserInfo from "../userSetting/UserInfo";
import HeaderIcon from "./HeaderIcon";
import { getTitle } from "./headerUtil";

const Header = () => {
  const location = useLocation();
  const title = getTitle(location.pathname);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex justify-between	items-center">
      <Typography.Title
        className="text-[#303972] font-bold	text-3xl max-lg:text-2xl max-md:text-xl"
        level={2}>
        {title}
      </Typography.Title>
      <div className="flex gap-4 max-sm :gap-2">
        <HeaderIcon isdot={true}>
          <BellOutlined
            className={`${isSmallScreen ? "text-xl	" : "text-2xl	"}`}
          />
        </HeaderIcon>
        <HeaderIcon isdot={false} className=" max-md:hidden">
          <SettingOutlined
            className={`${isSmallScreen ? "text-xl	" : "text-2xl	"}`}
          />
        </HeaderIcon>
        <UserInfo />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Header;
