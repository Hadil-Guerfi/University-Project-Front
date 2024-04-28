import { Form, Input, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createAvis } from './AvisAPI';
import PopupToRent from '../../components/Popup';
// import instance from "../../Utils/requestConfig/axiosInstance"
const { Dragger } = Upload;

const Avis = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [popupVisible,setPopupVisibile] =  useState('invisible')

  const onFinish = async (values) => {
    // Création de l'objet FormData pour gérer le fichier
    const data = new FormData();
    data.append('sujet', values.sujet);
    data.append('description', values.description);
    if (fileList[0]) {
      data.append('fichier', fileList[0].originFileObj); // 'fichier' est l'objet File représentant le fichier à télécharger
    }
    createAvis(data);
    setPopupVisibile("visible");

    // try {
    //   // Effectuer la requête POST
    //   const response = await instance.post('/avis/add', data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('Réponse du serveur:', response.data);
    //   // Réinitialiser le formulaire après avoir réussi l'envoi
    //   form.resetFields();
    //   // Réinitialiser l'état de fileList
    //   setFileList([]);
    // } catch (error) {
    //   console.error('Erreur lors de l\'envoi des données:', error);
    // }
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = ({ fileList }) => {
    // if(fileList.length()<=1)
    setFileList(fileList);
  };
  const content = (
    <div className='flex-col w-full'> 
      <div>
        <span className='text-main_color font-bold'> Merci davoir partagé votre avis ! Il a été envoyé avec succès.</span>
      </div>
      <div className='flex flex-col items-end '>
        <Button onClick={() => setPopupVisibile("invisible")} className="bg-white text-main_color flex justify-center items-center w-16 h-9 sm:w-20 px-2 sm:h-10 text-base rounded-3xl border-main_color border-2 hover:scale-105 transition duration-300 ease-in-out hover:shadow-indigo-200 hover:shadow-md" htmlType="reset">
          Terminé
        </Button>
      </div>
    </div>
);

  return (
    <div className='pt-10 '>
      <div className='flex flex-col '>
        <div className='flex justify-between items-center bg-main_color h-16 md:h-24 rounded-t-xl px-5 md:px-11 '>
          <div>
            <h4 className='font-bold text-base sm:text-xl text-white whitespace-nowrap'>Exprimez une avis :</h4>
          </div>
          <div className='flex justify-end relative h-16 md:h-24  w-6/12 max-w-96 overflow-hidden'>
            <div className="bg-yellow-500 rounded-xl h-full w-8/12 lg:w-60 z-2 mt-6 "></div>
            <div className="bg-orange-400 rounded-xl h-full w-6/12 md:w-56 z-1 absolute left-0 top-2/3 md:top-14 "></div>
          </div>
        </div>
        <div className='flex justify-center items-center bg-white p-10 pt-16 rounded-b-xl'>
          <Form
            form={form}
            name="my_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            className='w-10/12'
          >
            <Form.Item
              name="sujet"
              label="Sujet"
              rules={[
                {
                  required: true,
                  message: 'Veuillez entrer le sujet!',
                },
              ]}
              style={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Veuillez entrer une description!',
                },
              ]}
              style={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="fichier"
              label="Photo ou fichier"
              valuePropName="fileList"
              getValueFromEvent={onChange}
              // rules={[
              //   {
              //     required: true,
              //     message: 'Veuillez charger une photo ou un fichier!',
              //   },
              // ]}
              style={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Dragger name="file" multiple={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <div className='flex justify-end gap-4'>
                <Button className='bg-white text-main_color flex justify-center items-center w-20 h-10 text-base rounded-3xl border-main_color border-2 hover:scale-105 transition duration-300 ease-in-out hover:shadow-indigo-200 hover:shadow-md' htmlType="reset">
                  Vider
                </Button>
                <Button className='bg-main_color text-white flex justify-center items-center w-20 h-10 text-base rounded-3xl border-main_color  hover:bg-indigo-900 hover:scale-105 transition duration-300 ease-in-out hover:shadow-indigo-200 hover:shadow-md'  htmlType="submit">
                  Envoyer
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <PopupToRent content={content} title={""} visibility={popupVisible} setVisibility={setPopupVisibile}/>
      
   </div>
  );
};

export default Avis;
