import { useMutation } from "react-query";
import { request } from "../../Utils/requestConfig/request";

const login = (user) => {
  return request({ url: "/users/login", method: "POST", data: user });
};

export const UseLogin = (onSucessLogin, onErrorLogin) => {
  return useMutation(login, {
    onSuccess: onSucessLogin,
    onError: onErrorLogin,
  });
};
