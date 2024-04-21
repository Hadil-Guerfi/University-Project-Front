import {ForumSideBar} from "../../components/aboutForum/ForumSideBar"
import ForumContentSide from "../../components/aboutForum/ForumContentSide";
export const ForumPage = () => {
  return (
    <div className="mt-5 flex gap-x-10 h-full">
      <ForumContentSide />
      <ForumSideBar  />
    </div>
  );
}
