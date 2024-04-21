import { Input, Button, Typography, Spin, Form, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "../../Utils/socketConfig.js/socket";
import ScrollableChat from "../../components/scrollableChat/ScrollableChat";
import { useAuth } from "../../context/auth/authProvider";
import { ForumPage } from "./ForumPage";

const Forms = () => {
  //loggedIn === userID
  const { loggedIn } = useAuth();

  const selectedForum = { _id: "660b1aaf7bd065d25751c958" };

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.emit("setup", selectedForum._id);

    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.disconnect();
    };
  }, [loggedIn]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    if (!selectedForum) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:3001/api/forums/fetchMessages/",
        { params: { id_forum: selectedForum._id } }
      );
      // console.log(data.data.forumReponses);
      setMessages(data.data.forumReponses);
      setLoading(false);

      socket.emit("join forum", selectedForum._id);
    } catch (error) {
      toast.error("Failed to Load the Messages", {
        position: "bottom",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:3001/api/reponses/",
          {
            contenu_reponse: newMessage,
            id_forum: selectedForum._id,
            id_writer: loggedIn,
          }
        );

        socket.emit("new message", data.data.newReponse);
        setMessages([...messages, data.data.newReponse]);
      } catch (error) {
        toast.error("Failed to send the Message", {
          position: "bottom",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setNewMessage(""); // This will clear the input after sending the message
      }
    }
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedForum || selectedForum._id !== newMessageReceived.id_forum) {
        // Handle notifications
      } else {
        // console.log(newMessageReceived);
        setMessages([...messages, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  });

  return (
    <div className="h-full px-8 pt-8">
      <h2 className="text-[#303972] font-bold text-lg">Réponses :</h2>

      {selectedForum && (
        <>
          <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
            {loading ? (
              <Spin size="large" style={{ display: "block", margin: "auto" }} />
            ) : (
              <div className="h-full">
                {messages.length > 0 ? (
                  <ScrollableChat messages={messages} />
                ) : (
                  <p>No messages available</p>
                )}
              </div>
            )}
            <Form className="relative top-4">
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please input your message!" },
                ]}>
                <Input
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={sendMessage}
                />
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Forms;
