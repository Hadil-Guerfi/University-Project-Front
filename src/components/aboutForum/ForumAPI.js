import { useMutation, useQuery } from "react-query";
import { request } from "../../Utils/requestConfig/request";
import axios from "axios";


//---------------------------------------------------------------------------

const getAllThemes = () => {
  return request({ url: "/forums/themes" });
};

export const UseGetAllThemes = (onSuccessThemes, onErrorThemes) => {
  return useQuery("themes", getAllThemes, {
    onSuccess: onSuccessThemes,
    onError: onErrorThemes,
    refetchOnWindowFocus: false,
  });
};

//---------------------------------------------------------------------------

const addForum = (forum) => {
  return axios.post("http://localhost:3001/api/forums", forum, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddForum = (onSuccessForum, onErrorForum) => {
  return useMutation(addForum, {
    onSuccess: onSuccessForum,
    onError: onErrorForum,
    refetchOnWindowFocus: false,
  });
};


//---------------------------------------------------------------------------
const getAllUserForums = () => {
  return request({ url: "/forums/userForums" });
};

export const UseGetAllUserForums = (onSuccessForum, onErrorForum) => {
  return useQuery("forums", getAllUserForums, {
    onSuccess: onSuccessForum,
    onError: onErrorForum,
    refetchOnWindowFocus: false,
  });
};

//---------------------------------------------------------------------------
const getAllForums = (data) => {

  return request({
    url: "/forums/filterForums",
    method: "GET",
    params: data,
  });
};

export const UseGetAllForums = (data, onSuccess, onError) => {

  return useQuery("filtered-forums", () => getAllForums(data), {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
};
