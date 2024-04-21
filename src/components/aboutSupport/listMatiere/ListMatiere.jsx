import { Button, Flex } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import UneMatiere from "../uneMatiere/UneMatiere";

function ListMatiere() {
  const [viewMore, setViewMore] = useState(false);

  const supportCoursState = useSelector((state) => state.supportCoursState);
  const themes = [
    "#4D44B5",
    "#FB7D5B",
    "#FCC43E",
    "#7ba875",
    "#a275a8",
    "#a87575",

    "#303972",
    "#75a99c",
    "#b24361",
    "#419dad",
  ];

  return (
    <div className={`w-[28%] h-full self-start`}>
      <Flex
        vertical={true}
        justify="start"
        align="start"
        gap="middle"
        className={`${
          viewMore ? "overflow-y-scroll pr-1.5" : "overflow-y-hidden "
        } h-[82%] scrollbarListMatiere   w-full`}>
        {/*-------------------------------------- MATIERES --------------------------------------*/}

        {supportCoursState.status === "succeeded" &&
          supportCoursState.listeMatieres.map((matiere, index) => (
            <UneMatiere
              key={index}
              nomMatire={matiere.nomMatiere}
              nomModule={matiere.nomModule}
              types={matiere.types.join("-")}
              theme={themes[index % themes.length]}
            />
          ))}
      </Flex>
      <Button
        onClick={() => {
          setViewMore(!viewMore);
        }}
        size="large"
        className="w-full mt-5 rounded-2xl text-[#4D44B5] font-bold bg-[#e2e2f8] border-none">
        {viewMore ? "Voir Mois" : "Voir Plus"}
      </Button>
    </div>
  );
}

export default ListMatiere;
