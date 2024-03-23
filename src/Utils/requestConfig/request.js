import instance from "./axiosInstance";

export const request = ({ ...options }) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
