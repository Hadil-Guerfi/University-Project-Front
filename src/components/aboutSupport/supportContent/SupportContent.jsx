import { ConfigProvider, Flex, Pagination } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import "./SupportContent.css";
import FichierMatiere from "../fichierMatiere/FichierMatiere";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function SupportContent() {
  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const supportCoursState = useSelector((state) => state.supportCoursState);

   const fichierMatiereSelected = supportCoursState.matieres.filter(
     (matiere) => matiere.nomMatiere === supportCoursState.selectedMatiere
   )[0];

  console.log(fichierMatiereSelected);

  const onChange = (page) => {
    setCurrent(page);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <CaretLeftOutlined
          style={{ color: "#A098AE", fontSize: "20px", height: "30px" }}
        />
      );
    }
    if (type === "next") {
      return (
        <CaretRightOutlined style={{ color: "#A098AE", fontSize: "20px" }} />
      );
    }
    return originalElement;
  };

  const currentPageData = fichierMatiereSelected?.fichiers.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  return (
    <div className="grow p-5 bg-white rounded-lg self-start">
      <Title
        level={4}
        className="text-blue_list_matiere font-bold text-lg pb-7">
        {fichierMatiereSelected?.nomMatiere}
      </Title>

      <Flex vertical={true} align="center" justify="center" gap={40}>
        {currentPageData?.map((item, index) => (
          <FichierMatiere
            key={index}
            nomFichier={item.nomFichier}
            nomEnseignant={item.nomEnseignant}
            type={item.type}
            avatarEnseignant={item.avatarEnseignant}
          />
        ))}
      </Flex>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#A098AE",
            colorBorder: "#A098AE",
            borderRadius: "50%",
            colorPrimaryBorder: "#A098AE",
            controlHeight: 35,
            colorBgContainer: "#4D44B5",
          },
        }}>
        <Pagination
          className="pt-8 flex justify-between text-[#A098AE] text-sm"
          showTotal={(total, range) => (
            <div className="self-start">
              Afficher
              <span className="text-[#303972]">{` ${range[0]}-${range[1]} `}</span>
              de
              <span className="text-[#303972]">{` ${total} `}</span>
              fichiers
            </div>
          )}
          pageSize={pageSize}
          defaultCurrent={1}
          total={fichierMatiereSelected?.fichiers?.length} // Total des éléments dans le tableau de données
          current={current}
          onChange={onChange}
          itemRender={itemRender}
        />
      </ConfigProvider>
    </div>
  );
}

export default SupportContent;
