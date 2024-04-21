import { Select, Space, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd";
import AForum from "./AForum";
import { UseGetAllForums } from "./ForumAPI";
import { CaretLeftOutlined, CaretRightOutlined, SendOutlined } from "@ant-design/icons";

const OtherForumsSideBar = ({ themes }) => {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setParams({ themes: value });

  };


  const [params, setParams] = useState({ themes: [] }); // Corrected "bitcon" to "bitcoin"

  const onSuccessForum = (data) => {
    console.log(data);
  };

  const onErrorForum = (error) => {
    console.log(error);
  };

  const { data: filteredForums, refetch } = UseGetAllForums(
    params,
    onSuccessForum,
    onErrorForum
  );


  const [viewMoreOthersForums, setViewMoreOthersForums] = useState(false);


  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div className="othersForum h-full">
      <div className="pt-4 px-5">
        <h2
          className="text-[#303972] font-bold text-lg text-center pb-2"
          onClick={() => {
            setParams({ themes: ["bitcon", "hacking"] });
            refetch();
          }}>
          Vos recents forums
        </h2>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#c2bbeb99",
              colorBorder: "#c2bbeb99",
              colorPrimaryBorder: "#c2bbeb99",
            },
          }}>
          <Space
            style={{
              width: "100%",
              borderRadius: "50%",
            }}
            direction="vertical">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Veuillez sélectionner thème"
              onChange={handleChange}
              options={themes.map((theme) => ({
                label: theme,
                value: theme,
              }))}
            />
          </Space>
        </ConfigProvider>
      </div>

      <div
        className={`px-6 h-[35%] pt-2 ${
          viewMoreOthersForums
            ? "overflow-y-scroll pr-1.5"
            : "overflow-y-hidden "
        } scrollbarListMatiere   w-full`}>
        {filteredForums?.data?.data?.forums.map((forum, index) => (
          <AForum
            key={forum._id}
            forumId={forum._id}
            forumImg={forum.image_forum}
            index={index}
            titre={forum.titre}
            createdAt={forum.createdAt}
          />
        ))}
      </div>
      <div className="px-6 mt-5">
        <Button
          onClick={() => {
            setViewMoreOthersForums(!viewMoreOthersForums);
          }}
          size="large"
          className="w-full rounded-2xl text-[#4D44B5] font-bold bg-[#e2e2f8] border-none">
          {viewMoreOthersForums ? "Voir Mois" : "Voir Plus"}
        </Button>
      </div>
    </div>
  );
};

export default OtherForumsSideBar;
