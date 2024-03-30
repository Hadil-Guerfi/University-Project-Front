import { useMutation, useQuery } from "react-query";
import { request } from "../../Utils/requestConfig/request";

const fetchPaginatedOuvrages = (pageNumber, themeFilter) => {
  return request({ url: `/ouvrages/?page=${pageNumber}&nb=9&theme=${themeFilter}`, method: "GET" });
};

const fetchNbOuvragesForEachTheme = () => {
  return request({ url: `/ouvrages/nb_ouvrage_by_theme`, method: "GET" });
};

// const fetchTheme = () => {
//   return request({ url: `/themes/`, method: "GET" });
// };

const emprunter = (ouvrage) => {
  return request({ url: "/emprunts/add", method: "POST", data: ouvrage });
};

export const useEmprunter = (onSucessEmprunter, onErrorEmprunter) => {
  return useMutation(emprunter, {
    onSuccess: onSucessEmprunter,
    onError: onErrorEmprunter,
  });
};


export const useOuvrage = (pageNumber, themeFilter) => {
  return useQuery(
    ['ouvrages',pageNumber,themeFilter],
    ()=> fetchPaginatedOuvrages(pageNumber, themeFilter)
  );
};

export const useOuvrageByTheme = () => {
  return useQuery(
    ['ouvragesByTheme'],
    ()=> fetchNbOuvragesForEachTheme()
  );
}

