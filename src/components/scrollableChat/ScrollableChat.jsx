
import { useState } from "react";
import Message from "../aboutForum/Message";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {




  return (
    <ScrollableFeed className="h-[500px] overflow-auto">
      {messages.map((message) => (
        <Message
          key={message?._id}
          id={message?._id}
          userNom={message?.userNom}
          userPrenom={message?.userPrenom}
          userAvatar={message?.userAvatar}
          contenu_reponse={message?.contenu_reponse}
          totalLikes={message?.totalLikes}
          totalDislikes={message?.totalDislikes}
        />
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
