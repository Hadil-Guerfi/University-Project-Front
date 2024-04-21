import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Flex, Typography } from "antd";
import { useDispatch } from "react-redux";
import { setSelectedMatiere } from "../../../ReduxToolkit/supportCoursSlice";

const { Text, Title } = Typography;
function UneMatiere({ nomMatire, types, nomModule, theme }) {
  const currentYear = new Date().getFullYear();

  const dispatch = useDispatch();

  const handleSelection = () => {
    dispatch(setSelectedMatiere({ nomMatiere: nomMatire }));
  };

  console.log(`bg-[${theme}]`);

  return (
    <div
      className=" w-full h-[120px] bg-white rounded-xl relative flex cursor-pointer"
      onClick={() => {
        handleSelection();
      }}>
      <div
        style={{ backgroundColor: theme }}
        className={` h-full rounded-tl-xl rounded-bl-xl  w-5`}></div>

      <div className="not-colored py-1.5 px-3 grow">
        <div className="mb-3">
          <Title
            level={4}
            className="text-blue_list_matiere font-bold text-base mb-0 ">
            {nomMatire}
          </Title>
          <Text className="text-gray_support_cours text-sm ">{nomModule}</Text>
        </div>

        <Flex align="center" justify="space-between">
          <Flex vertical={true}>
            <Flex align="center" gap={15} className="pb-1">
              <CalendarOutlined style={{ color: "#FB7D5B" }} />
              <Text className="text-gray_support_cours text-sm">{types}</Text>
            </Flex>

            <Flex align="center" gap={15}>
              <ClockCircleOutlined style={{ color: "#FCC43E" }} />
              <Text className="text-gray_support_cours text-sm">
                {currentYear - 1}/{currentYear}
              </Text>
            </Flex>
          </Flex>

          <Avatar size={40} className="bg-[rgb(193,187,235)]" />
        </Flex>
      </div>
    </div>
  );
}

export default UneMatiere;
