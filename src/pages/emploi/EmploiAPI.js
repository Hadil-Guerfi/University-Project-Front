import { request } from "../../Utils/requestConfig/request";

export const fetchEmploi = async () =>{
    try {
    const response = await request({
      method: 'GET',
      url: '/emplois/getEmploi',
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // console.log(response);
    // return response.data.fichierEm;

    headers: { 'Content-Type': 'multipart/form-data' },
    // on crée une URL pour le blob de données à l’aide de URL.createObjectURL pour afficher ce contenu PDF dans notre composant React
    responseType: 'blob' // Indiquez à axios de traiter la réponse en tant que Blob
  });
  const file = new Blob([response.data], { type: 'application/pdf' }); // Créez un Blob à partir des données
  const fileURL = URL.createObjectURL(file); // Créez une URL pour le Blob
  return fileURL; // Renvoyez l'URL du fichier au lieu du chemin
  } catch (error) {
    return console.error(error);
  }

}