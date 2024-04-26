import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth/authProvider";
import { UseAddForum, UseGetAllThemes, UseGetAllUserForums } from "./ForumAPI";
import OtherForumsSideBar from "./OtherForumsSideBar";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedForum } from "../../ReduxToolkit/ForumSlice";

const MyForumsSideBar = () => {
  const [viewMoreMyForums, setViewMoreMyForums] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");

  //----------------------------- THEMES ----------------------------------------
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const { data: themes, isLoading, isError } = UseGetAllThemes();

  useEffect(() => {
    if (!isLoading && !isError) {
      setItems(themes.data.data.themes);
    }
  }, [isLoading, isError, themes]);

  const [itemExistsError, setItemExistsError] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    const lowerCaseItems = items.map((item) => item.toLowerCase());
    const lowerCaseName = name.trim().toLowerCase();
    if (lowerCaseItems.includes(lowerCaseName)) {
      setItemExistsError(`${name} already exists in themes list !`);
    } else {
      if (name !== "") {
        setItems([...items, name]);
        setName("");
      }
      setItemExistsError("");
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChangeSelect = (value) => {
    setSelectedItems(value);
  };

  //----------------------------- IMAGE UPLOAD  ----------------------------------------
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );
  //-----------------------------  FORUM  ----------------------------------------
  const [forumsErrors, setForumsErrors] = useState({
    themes: "",
    titre: "",
    contenu: "",
    image_forum: "",
  });

  const queryClient = useQueryClient();

  const onSuccessForum = () => {
    setIsModalOpen(false);

    toast.success("Forum cré avec  succés");

    queryClient.invalidateQueries("forums");

    setFileList([]);

    setContenu("");
    setTitre("");
    setName("");

    setForumsErrors({
      themes: "",
      titre: "",
      contenu: "",
      image_forum: "",
    });
  };
  const onErrorForum = (error) => {
    const atts = Object.keys(forumsErrors);
    const paths = error.response.data.message.map((msg) => msg.path);

    atts.map((att) => {
      if (paths.includes(att)) {
        setForumsErrors((prevForms) => ({
          ...prevForms,
          [att]: error.response.data.message.find((msg) => msg.path === att)
            .msg,
        }));
      } else {
        setForumsErrors((prevForms) => ({
          ...prevForms,
          [att]: "",
        }));
      }
    });
  };

  const { mutate: creerForum } = UseAddForum(onSuccessForum, onErrorForum);

  //----------------------------- MODAL ----------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedIn } = useAuth();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    creerForum({
      themes: selectedItems,
      contenu,
      titre,
      image_forum: fileList[0]?.originFileObj,
      id_creator: loggedIn,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setForumsErrors({
      themes: "",
      titre: "",
      contenu: "",
      image_forum: "",
    });
    setFileList([]);
    setContenu("");
    setTitre("");
    setName("");
  };

  //--------------------------- ALL CURRENT USER FORUMS --------------------------------------

  const {
    data: currentUserForums,
    isLoading:isLoadingUserForums,
    isError:isErrorUserForums,
  } = UseGetAllUserForums();

  const dispatch=useDispatch();

  const forumState=useSelector((state)=>state.ForumState)

 
  useEffect(() => {
    if (!isErrorUserForums && !isLoadingUserForums) {
      const latestForum = currentUserForums?.data?.data?.forumsRes
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
        .slice(0, 1)[0];
      // console.log(latestForum);

      dispatch(setSelectedForum({ selectedForum:latestForum }));

    }
  }, [isLoadingUserForums, isErrorUserForums, currentUserForums]);
  

  return (
    <div className="h-full relative">
      <div className="flex justify-between items-center pt-4 px-5">
        <h2 className="text-[#303972] font-bold text-lg">Vos recents forums</h2>

        <div
          className="flex items-center justify-center w-8 h-8 rounded-[50%] bg-[#4D44B5] font-bold cursor-pointer"
          onClick={showModal}>
          <FiPlus
            style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
          />
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
        <Modal
          destroyOnClose={true}
          className="forumPopUp"
          title="Créer forum"
          open={isModalOpen}
          okText="Créer"
          okButtonProps={{
            style: { backgroundColor: "#4D44B5", borderRadius: "20px" },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "white",
              border: "1px solid #4D44B5 ",
              color: "#4D44B5",
              borderRadius: "20px",
            },
          }}
          cancelText="Annuler"
          onOk={handleOk}
          onCancel={handleCancel}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#c2bbeb99",
                colorBorder: "#c2bbeb99",
                colorPrimaryBorder: "#c2bbeb99",
              },
            }}>
            <div className="pb-3">
              <div className="text-[#303972] text-sm font-medium pb-[1px]">
                Théme
              </div>

              <Select
                mode="multiple"
                style={{
                  width: "90%",
                  borderRadius: "6px",
                }}
                status={forumsErrors.themes ? "error" : ""}
                onChange={handleChangeSelect}
                placeholder="select themes"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                        borderRadius: "0",
                      }}>
                      <div>
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </div>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}>
                        Add item
                      </Button>
                    </Space>
                    <div className=" text-red-600 text-xs font-semibold flex items-center justify-center">
                      {itemExistsError && <div>{itemExistsError}</div>}
                    </div>
                  </>
                )}
                options={
                  themes
                    ? items.map((item) => ({
                        label: item,
                        value: item,
                      }))
                    : []
                }
              />
              {forumsErrors.themes && (
                <div className="text-red-600 text-xs font-semibold">
                  {forumsErrors.themes}
                </div>
              )}
            </div>

            <div className="pb-3">
              <div className="text-[#303972] text-sm font-medium  pb-[1px]">
                Titre
              </div>
              <Input
                style={{ width: "90%" }}
                value={titre}
                onChange={(e) => {
                  setTitre(e.target.value);
                }}
                status={forumsErrors.titre ? "error" : ""}
              />
              {forumsErrors.titre && (
                <div className="text-red-600 text-xs font-semibold">
                  {forumsErrors.titre}
                </div>
              )}
            </div>

            <div className="pb-2">
              <div className="text-[#303972] text-sm font-medium  pb-[1px]">
                Contenu
              </div>
              <TextArea
                style={{ width: "90%", minHeight: "80px" }}
                value={contenu}
                onChange={(e) => {
                  setContenu(e.target.value);
                }}
                status={forumsErrors.contenu ? "error" : ""}
              />
              {forumsErrors.contenu && (
                <div className="text-red-600 text-xs font-semibold">
                  {forumsErrors.contenu}
                </div>
              )}
            </div>

            <div className="pb-3">
              <div className=" w-fit mx-auto pt-5">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => {
                    return false;
                  }}>
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
              {forumsErrors.image_forum && (
                <div className="text-red-600 text-xs font-semibold flex items-center justify-center">
                  {forumsErrors.image_forum}
                </div>
              )}
            </div>
          </ConfigProvider>
        </Modal>
      </div>
      <div className="text-[#A098AE] text-xs  px-5">
        Vous avez {currentUserForums?.data?.data?.forums?.length || ""} forums
      </div>

      <div
        className={`px-6 h-[40%] pt-2 ${
          viewMoreMyForums ? "overflow-y-scroll pr-1.5" : "overflow-y-hidden "
        } scrollbarListMatiere   w-full`}>
        {currentUserForums &&
          currentUserForums?.data?.data?.forumsRes
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((forum, index) => (
              <Question
                key={index}
                index={index + 1}
                title={forum.titre}
                forumImg={forum.image_forum}
                _id={forum._id}
                createdAt={forum.createdAt}
                updatedAt={forum.updatedAt}
                contenu={forum.contenu}
                themes={forum.themes}
                id_creator={forum.id_creator}
                nbrReponse={forum.nbrReponse}
                nomCreator={forum.nomCreator}
                prenomCreator={forum.prenomCreator}
                avatarCreator={forum.avatarCreator}
              />
            ))}
      </div>
      <div className="px-6 mt-5">
        <Button
          onClick={() => {
            setViewMoreMyForums(!viewMoreMyForums);
          }}
          size="large"
          className="w-full rounded-2xl text-[#4D44B5] font-bold bg-[#e2e2f8] border-none">
          {viewMoreMyForums ? "Voir Mois" : "Voir Plus"}
        </Button>
      </div>
      <OtherForumsSideBar themes={items} />
    </div>
  );
};

export default MyForumsSideBar;
