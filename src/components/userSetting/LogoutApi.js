import { useMutation } from "react-query";
import { request } from "../../Utils/requestConfig/request";

const logout = () => {
  return request({ url: `/users/logout`, method: "POST" });
};
export const useLogout = (onSucessLogout, onErrorLogout) => {
    return useMutation(logout, {
      onSuccess: onSucessLogout,
      onError: onErrorLogout,
    });
  };
  