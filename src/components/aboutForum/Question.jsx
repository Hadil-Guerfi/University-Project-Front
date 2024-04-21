import React from 'react'
import { Avatar } from "antd";
 import { PiEnvelopeThin } from "react-icons/pi";

const Question = ({ index, title, forumImg }) => {
  return (
    <div className="flex items-center justify-between pt-6">
      <div className="flex items-center gap-x-2 ">
        <Avatar src={forumImg} />
        <div className="flex flex-col items-start justify-between">
          <div className="text-[#303972] text-sm font-semibold">
            Question {index}
          </div>
          <div className="text-[#A098AE] text-xs">{title}</div>
        </div>
      </div>
      <div className=" question-envelop flex items-center justify-center border-[#a097ae] border w-[31px] h-[31px] rounded-full hover:border-none hover:bg-[#4D44B5] hover:cursor-pointer">
        <PiEnvelopeThin
          className="question-envelop-icon "
          style={{ fontSize: "20px", color: "#a097ae" }}
        />
      </div>
    </div>
  );
};

export default Question
