import React from 'react'
import { useQuery, useMutation } from "react-query";
import { request } from "../../Utils/requestConfig/request";

const fetchPaginatedActualites = (numberPage, dateDebut, dateFin) => {
    return request({ url: `/actualites/?pageNumber=${numberPage}&dataPerPage=4&dateDebut=${dateDebut}&dateFin=${dateFin}`, method: "GET" });
  };

export const useActualite = (numberPage, dateDebut, dateFin) => {
    return useQuery(
      ['actualites',numberPage,dateDebut,dateFin],
      ()=> fetchPaginatedActualites(numberPage,dateDebut, dateFin)
    );
  };