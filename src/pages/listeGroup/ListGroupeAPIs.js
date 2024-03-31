import { useQuery } from "react-query";
import { request } from "../../Utils/requestConfig/request";

const fetchClassmates = () => {
    return request({ url: `/etudiants/classmates/`, method: "GET" });
  };

export const useClassmates = () => {
    return useQuery(
      ['classmates'],
      ()=> fetchClassmates()
    );
  };