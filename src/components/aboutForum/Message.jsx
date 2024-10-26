import React, { useState } from "react";
import { Avatar } from "antd";
import dayjs from "dayjs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../../context/auth/authProvider";

function Message({
  id,
  contenu_reponse,
  totalLikes,
  totalDislikes,
  userAvatar,
  userNom,
  userPrenom,
  createdAt,
}) {
  const [likes, setLikes] = useState(totalLikes);
  const [dislikes, setDislikes] = useState(totalDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { loggedIn } = useAuth();

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/reponses/liked",
        {
          id_reponse: id,
          id_proprietaire_react: loggedIn,
        }
      );

      if (response.status === 201) {
        if (!liked) {
          setLikes(likes + 1);
          setLiked(true);
          if (disliked) {
            setDislikes(dislikes - 1 > 0 ? dislikes - 1 : 0);
            setDisliked(false);
          }
        } else {
          setLikes(likes - 1 > 0 ? likes - 1 : 0);
          setLiked(false);
        }
      }
    } catch (error) {
      console.error("Error while toggling like:", error);
    }
  };

  const toggleDislike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/reponses/disliked",
        {
          id_reponse: id,
          id_proprietaire_react: loggedIn,
        }
      );

      if (response.status === 201) {
        if (!disliked) {
          setDislikes(dislikes + 1);
          setDisliked(true);
          if (liked) {
            setLikes(likes - 1 > 0 ? likes - 1 : 0);
            setLiked(false);
          }
        } else {
          setDislikes(dislikes - 1 > 0 ? dislikes - 1 : 0);
          setDisliked(false);
        }
      }
    } catch (error) {
      console.error("Error while toggling dislike:", error);
    }
  };

  return (
    <div
      className="border border-[#C1BBEB] pt-4 w-full px-4 pb-2 min-h-[120px] rounded-lg flex flex-col items-start justify-between"
      style={{ marginTop: "20px" }}
      key={id}>
      <span className="text-[#303972]">{contenu_reponse}</span>
      <div className="self-center w-full flex flex-col">
        <div className="flex items-center justify-center self-center mt-4">
          <Avatar src={`http://localhost:3001/uploads/${userAvatar}`} />
          <div className="flex flex-col items-center pl-2">
            <p className="text-[#303972] text-xs font-bold">
              {userNom} {userPrenom}
            </p>
            <div className="text-[#A098AE] text-xs">
              {dayjs(createdAt).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
        <div className="self-center w-full flex flex-col">
          <div className="flex items-center justify-center self-end gap-[2px]">
            <div
              className="flex items-center justify-center"
              onClick={toggleLike}>
              <AiFillLike
                style={{
                  fontSize: "20px",
                  color: liked ? "#4D44B5" : "#615A6D",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              />
              <span className="text-[#615A6D] text-xs">{likes}</span>
            </div>
            <div
              className="flex items-center justify-center"
              onClick={toggleDislike}>
              <AiFillDislike
                style={{
                  fontSize: "20px",
                  color: disliked ? "#4D44B5" : "#615A6D",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              />
              <span className="text-[#615A6D] text-xs"> {dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
