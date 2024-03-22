//request.js

import instance from "./axiosInstance";

export const request = ({ ...options }) => {
  return new Promise((resolve, reject) => {
    //appeler instance qui est creer par axios.create et que je peux la passer comme option url et method
    instance(options)
      .then((response) => {
        resolve(response); // Resolve with the response when the request is successful.
      })
      .catch((error) => {
        reject(error); // Reject with the error when there's an error.
      });
  });
};
