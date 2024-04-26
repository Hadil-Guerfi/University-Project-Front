import { Input, Spin, Form } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "../../Utils/socketConfig.js/socket";
import ScrollableChat from "../../components/scrollableChat/ScrollableChat";
import { useAuth } from "../../context/auth/authProvider";
import { useSelector } from "react-redux";

const Forms = () => {
  const { loggedIn } = useAuth();
  const forumState = useSelector((state) => state.ForumState);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!forumState || !forumState._id) return;

    const handleSetup = () => {
      console.log("User connected");
      socket.emit("join forum", forumState._id);
    };

    socket.emit("setup", forumState._id);
    socket.on("connected", handleSetup);

    return () => {
      socket.off("connected", handleSetup);
    };
  }, [loggedIn, forumState._id]);

  useEffect(() => {
    if (!forumState || !forumState._id) return;

    fetchMessages();
  }, [forumState]);

  useEffect(() => {
    const handleNewMessage = (newMessageReceived) => {
      console.log({ newMessageReceived });
      if (forumState && forumState._id === newMessageReceived.id_forum) {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on("message received", handleNewMessage);

    return () => {
      socket.off("message received", handleNewMessage);
    };
  }, [forumState]);

  const fetchMessages = async () => {
    if (!forumState) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3001/api/forums/fetchMessages/",
        { params: { id_forum: forumState._id } }
      );
      setMessages(data.data.forumReponses);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to Load the Messages");
      setLoading(false);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage && forumState && forumState._id) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:3001/api/reponses/",
          {
            contenu_reponse: newMessage,
            id_forum: forumState._id,
            id_writer: loggedIn,
          }
        );
        socket.emit("new message", data.data.newReponse);
        setMessages([...messages, data.data.newReponse]);
      } catch (error) {
        toast.error("Failed to send the Message");
      }
    }
  };

  return (
    <div className="h-full px-8 pt-8">
      <h2 className="text-[#303972] font-bold text-lg">Réponses :</h2>

      {forumState._id && (
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
