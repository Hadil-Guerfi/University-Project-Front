import { Avatar, Flex } from "antd";
import logo from "../../assests/logo.png";

export const TitleForum = () => {
  const arrayTheme = ["Bitcoin", "Finance", "Cryptocurrency"]; // Corrected spelling of "Bitcoin"

  return (
    <Flex
      vertical={false}
      justify=""
      align="start" // Corrected alignment value from "stat" to "start"
      gap="20px"
      className=" relative mb-1  p-6 after:content-[''] after:absolute after:w-full after:right-0 after:h-[2px] after:top-[100%] after:bg-[#c2bbeb99]">
      <img
        alt=""
        src={logo}
        className="w-[130px] h-[130px] relative bg-white rounded-xl border border-[#c2bbeb5d] shadow-md"
      />
      <Flex vertical={true} align="start" className=" w-[80%]">
        <div className="text-[#303972] font-semibold ">
          Quels sont les bonnes pratiques pour un développeur Blockchain ?
        </div>

        <div className="flex items-center justify-center gap-5 pt-3">
          {arrayTheme.map((theme, index) => (
            <div
              key={index}
              className="bg-[#C1BBEB] text-xs py-[6px] px-3 rounded-2xl text-[#303972] font-medium">
              {theme}
            </div> // Added key prop to each child element in the map function
          ))}
        </div>

        <Flex vertical={false} justify="space-between" className="pt-8 w-full">
          <div className=" flex items-center justify-center">
            <Avatar />
            <p className="text-[#303972] text-xs font-semibold pl-2">
              folen folen
            </p>
          </div>
          <div className=" flex items-center justify-center gap-8">
            <p className=" text-xs text-[#A098AE]  ">il y 2 mois</p>
            <p className=" text-xs text-[#A098AE] ">56 reponses</p>
          </div>
        </Flex>
      </Flex>

      {/* Removed empty <div></div> */}
    </Flex>
  );
};
