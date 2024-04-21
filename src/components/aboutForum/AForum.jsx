import { Avatar } from "antd";
import dayjs from "dayjs";
import { PiEnvelopeThin } from "react-icons/pi";

const AForum = ({ index, titre, forumImg, forumId, createdAt }) => {
  return (
    <div className="flex items-center gap-x-[1px] justify-between pt-4 pb-4 relative after:content-[''] after:absolute after:w-full after:right-0 after:h-[2px] after:top-[100%] after:bg-[#c2bbeb99]">
      <div className="flex items-center gap-x-2 ">
        <Avatar src={`http://localhost:3001/uploads/${forumImg}`} />
        <div className="flex flex-col items-start justify-between">
          <div className="text-[#303972] text-sm font-semibold">
            Forum {index}
          </div>
          <div className="text-[#A098AE] text-xs">{titre}</div>
        </div>
      </div>
      <div className=" question-envelop self-start min-w-[65px] text-[#A098AE] text-xs pr-[1px]">
        {dayjs(createdAt).format("YYYY-MM-DD")}
      </div>
    </div>
  );
};

export default AForum;
