import React from "react";
import { Avatar } from "antd";
import { PiEnvelopeThin } from "react-icons/pi";
import { setSelectedForum } from "../../ReduxToolkit/ForumSlice";
import { useDispatch, useSelector } from "react-redux";

const Question = ({
  index,
  title,
  forumImg,
  themes,
  id_creator,
  _id,
  createdAt,
  updatedAt,
  contenu,
  nbrReponse,
  nomCreator,
  prenomCreator,
  avatarCreator,
}) => {
  const dispatch = useDispatch();
  const forumState = useSelector((state) => state.ForumState);

  // console.log(index, title, forumImg, themes, _id, createdAt, contenu);
  return (
    <div className="flex items-center justify-between pt-6">
      <div className="flex items-center gap-x-2 ">
        <Avatar src={`http://localhost:3001/uploads/${forumImg}`} />
        <div className="flex flex-col items-start justify-between">
          <div className="text-[#303972] text-sm font-semibold">
            Question {index}
          </div>
          <div className="text-[#A098AE] text-xs">{title}</div>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch(
            setSelectedForum({
              selectedForum: {
                contenu,
                id_creator,
                image_forum: forumImg,
                themes,
                titre: title,
                updatedAt,
                createdAt,
                _id,
                nbrReponse,
                nomCreator,
                prenomCreator,
                avatarCreator,
              },
            })
          );
        }}
        className=" min-w-[31px] question-envelop flex items-center justify-center border-[#a097ae] border w-[31px] h-[31px] rounded-full hover:border-none hover:bg-[#4D44B5] hover:cursor-pointer">
        <PiEnvelopeThin
          className="question-envelop-icon "
          style={{ fontSize: "20px", color: "#a097ae" }}
        />
      </div>
    </div>
  );
};

export default Question;
