import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import  { forwardRef } from "react";

const AvatarCard = forwardRef((props, ref) => {
  const { isOpen } = props;

  return (
      <div
          ref={ref}
      className={`bg-white rounded-xl absolute right-[-20px] top-[120%] text-[#303972] pl-7 pr-9 py-5 transition-all ${
        isOpen ? "" : "hidden"
      }`}>
      <div className=" flex gap-3 cursor-pointer mb-2  ">
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
