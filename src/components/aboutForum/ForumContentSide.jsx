import Forms from "../../pages/forms/Forms";
import { TitleForum } from "./TitleForum";

const ForumContentSide = () => {
  return (
    <div className="bg-white relative w-[70%] h-fit">
      <TitleForum />
      <Forms/>
    </div>
  );
};

export default ForumContentSide;