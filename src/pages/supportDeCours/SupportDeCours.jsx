import { Flex } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModules } from "../../ReduxToolkit/supportCoursSlice";
import ListMatiere from "../../components/aboutSupport/listMatiere/ListMatiere";
import SupportContent from "../../components/aboutSupport/supportContent/SupportContent";
import { useAuth } from "../../context/auth/authProvider";

function SupportDeCours() {
  const { loggedIn } = useAuth();
  // console.log(loggedIn)

  const supportCoursState = useSelector((state) => state.supportCoursState);

  console.log("supportCoursState", supportCoursState);

  const dispatch = useDispatch();

  //-------------------------------- ADD condition if current date de a => b donc sem 1 else sem2

  useEffect(() => {
    dispatch(fetchModules({ userId: loggedIn, semestre: "semestre1" }));
  }, [loggedIn]);

  return (
    <div className="w-full h-full pt-4">
      <Flex className="h-full" justify="center" align="center" gap={100}>
        <ListMatiere />
        <SupportContent />
      </Flex>
    </div>
  );
}

export default SupportDeCours;
