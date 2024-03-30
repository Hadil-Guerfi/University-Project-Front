import { Typography } from "antd";

const { Text, Title } = Typography;
function TitleMatiere() {
  return (
    <div className="w-[28%] bg-white rounded-xl p-5 mb-4  ">
      <Title
        level={4}
        className="text-blue_list_matiere font-bold text-lg mb-0 ">
        Liste des matière
      </Title>
      <Text className="text-gray_support_cours text-sm ">
        filière: Ing-A2-GL
      </Text>
    </div>
  );
}

export default TitleMatiere;
