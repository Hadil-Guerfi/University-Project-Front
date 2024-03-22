// import axios from "axios"
import { useMutation, useQuery } from "react-query";
// import instance from "./axiosInstance";
import { request } from "./request";

const login=(user)=>{
    // return instance.post("http://localhost:4000/api/auth/login",user);
      return request({ url: "/auth/login", method: "POST", data: user });

}


export const UseLogin=(onSucessLogin ,onErrorLogin)=>{
    return useMutation(login, {
      onSuccess: onSucessLogin,
      onError: onErrorLogin,
    });
}

const verifyLogin = () => {
  // console.log(params)
  return request({
    url: "/auth/verifyLogIn",
    method: "GET",
  });
};

export const UseVerifyLogin = (onSucessLoggedIn, onErrorLoggedIn) => {
  return useQuery("logged-in",verifyLogin, {
    onSuccess: onSucessLoggedIn,
    onError: onErrorLoggedIn,
  });
};