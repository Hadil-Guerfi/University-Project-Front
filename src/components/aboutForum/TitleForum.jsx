import { Avatar, Flex } from "antd";
import logo from "../../assests/logo.png";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export const TitleForum = () => {

  const forumState = useSelector((state) => state.ForumState);

  return (
    <Flex
      vertical={false}
      justify=""
      align="start" // Corrected alignment value from "stat" to "start"
      gap="20px"
      className=" relative mb-1  p-6 after:content-[''] after:absolute after:w-full after:right-0 after:h-[2px] after:top-[100%] after:bg-[#c2bbeb99]">
      <img
        alt=""
        src={`http://localhost:3001/uploads/${forumState?.image_forum}`}
        className="w-[130px] h-[130px] relative bg-white rounded-xl border border-[#c2bbeb5d] shadow-md"
      />
      <Flex vertical={true} align="start" className=" w-[80%]">
        <div className="text-[#303972] font-semibold ">{forumState?.titre}</div>

        <div className="flex items-center justify-center gap-5 pt-3">
          {forumState?.themes.map((theme, index) => (
            <div
              key={index}
              className="bg-[#C1BBEB] text-xs py-[6px] px-3 rounded-2xl text-[#303972] font-medium">
              {theme}
            </div> // Added key prop to each child element in the map function
          ))}
        </div>
        <Flex vertical={true} align="start" className=" w-[100%]">
          <div className=" text-sm pt-4  ">{forumState?.contenu}</div>
        </Flex>
        <Flex
          vertical={false}
          justify="space-between"
          className="pt-6 w-full self-end ">
          <div className=" flex items-center justify-center">
            <Avatar
              alt=""
              src={`http://localhost:3001/uploads/${forumState?.avatarCreator}`}
            />
            <p className="text-[#303972] text-xs font-semibold pl-2">
              {forumState?.nomCreator} {forumState?.prenomCreator}
            </p>
          </div>
          <div className=" flex items-center justify-center gap-8">
            <p className=" text-xs text-[#A098AE]  ">
              {dayjs(forumState?.createdAt).format("YYYY-MM-DD")}
            </p>
            <p className=" text-xs text-[#A098AE] ">
              {forumState?.nbrReponse} reponses
            </p>
          </div>
        </Flex>
      </Flex>

      {/* Removed empty <div></div> */}
    </Flex>
  );
};
