import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const getItem = (label, key, icon) => {
  return {
    key,
    icon,
    label,
    className:
      " border-0 pr-0 pl-0 w-full grid grid-flow-col	justify-start	rounded-r-none rounded-l-full   h-12 leading-[3rem] ",
  };
};

export const items = [
  getItem("Actualité", "/", <MailOutlined className="ml-6" />),
  getItem("Emploi de temps", "/emploi", <AppstoreOutlined className="ml-6" />),
  getItem("Evenments", "/evenments", <SettingOutlined className="ml-6" />),
  getItem(
    "Liste de votre groupe",
    "/groupe",
    <SettingOutlined className="ml-6" />
  ),
  getItem("Note", "/note", <SettingOutlined className="ml-6" />),
  getItem(
    "Bibliothèque",
    "/bibliotheque",
    <SettingOutlined className="ml-6" />
  ),
  getItem("Forms", "/forms", <SettingOutlined className="ml-6" />),
  getItem("Envoyer votre avis ", "/avis", <SettingOutlined className="ml-6" />),
];
