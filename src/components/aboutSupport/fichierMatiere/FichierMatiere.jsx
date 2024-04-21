import { Avatar, Flex } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;
function FichierMatiere({ nomFichier,fichier, nomEnseignant, type, avatarEnseignant }) {
  return (
    <Flex className="w-full self-center" align="center" justify="space-between">
      <Flex align="center" justify="space-between">
        <Avatar
          size={40}
          className="bg-[rgb(193,187,235)] mr-5"
          src={`http://localhost:3001/uploads/${avatarEnseignant}`}
        />
        <Text className="text-[#303972] font-bold">
          {nomEnseignant}.{type}
        </Text>
      </Flex>
      <Flex
        className="w-[70%] self-center"
        align="center"
        justify="space-between">
        <Text className="text-[#4D44B5] font-bold">{nomFichier}</Text>

        <a
          href={`http://localhost:3001/uploads/${fichier}`}
          download={nomFichier}
          target="_blank">
          <EyeOutlined
            size="large"
            style={{ color: "#4D44B5", fontSize: "20px" }}
          />
        </a>
      </Flex>
    </Flex>
  );
}

export default FichierMatiere;
