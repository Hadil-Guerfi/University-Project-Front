import ScrollableFeed from "react-scrollable-feed";
import { Avatar } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
const ScrollableChat = ({ messages }) => {
  return (
    <div className="h-[500px] overflow-auto mt-2 ">
      {messages &&
        messages.map((message) => (
          <div
            className="border border-[#C1BBEB] pt-4 px-4 pb-2  min-h-[120px] rounded-lg flex flex-col items-start justify-between"
            style={{ display: "flex", marginTop: "20px" }}
            key={message._id}>
            <span className="text-[#303972] ">{message.contenu_reponse}</span>
            <div className="self-center w-full flex flex-col">
              <div className=" flex items-center justify-center self-center ">
                <Avatar />
                <div className="flex flex-col items-center pl-2">
                  <p className="text-[#303972] text-xs font-bold ">
                    folen folen
                  </p>
                  <div className="text-[#A098AE] text-xs">Il y 5 jours</div>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center self-end">
                <LikeOutlined style={{ fontSize: "20px", color: "#615A6D" }} />
                <DislikeOutlined
                  style={{ fontSize: "20px", color: "#615A6D" }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
