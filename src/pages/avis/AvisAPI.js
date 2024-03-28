import { request } from "../../Utils/requestConfig/request";

export const createAvis = (formdata) =>{
    return request({
        method: 'POST',
        url: '/avis/add',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
  .then(response => console.log(response))
  .catch(error => console.error(error));

}