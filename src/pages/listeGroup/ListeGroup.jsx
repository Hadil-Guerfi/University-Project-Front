// import React, { useEffect, useState } from "react";
// import CardEtudiant from "../../components/listeGroupe/CardEtudiant";
// import { ConfigProvider, Pagination, Space } from "antd";
// import { themePagination } from "../../Utils/theme/themPagination";

// const ListeGroup = () => {
//   const [pageNumber, setPageNumber] = useState(1)
//   const pageSize = 2;
//   const onChangePage = (page) => {
//     setPageNumber(page);
//   };
  // const groupMates = [
  //   {
  //     nom:"nom_Etudiant",
  //     num_inscription:"147855",
  //     avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
  //   },
  //   {
  //     nom:"nom_Etudiant",
  //     num_inscription:"147855",
  //     avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
  //   },
  //   {
  //     nom:"nom_Etudiant",
  //     num_inscription:"147866",
  //     avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
  //   },
  //   {
  //     nom:"nom_Etudiant",
  //     num_inscription:"147866",
  //     avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
  //   },
  //   {
  //     nom:"nom_Etudiant",
  //     num_inscription:"147866",
  //     avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
  //   },
  // ];
//   const [six_students, setSix_students] = useState([groupMates.slice(0, pageSize)])
//   useEffect(() => {
//     const startIndex = (pageNumber - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     setSix_students( groupMates.slice(startIndex, endIndex));
//   }, [pageNumber]);


//   const listEtudiant = six_students.map((item, index) => {
//     return (
//       <div key={index}>
//         <CardEtudiant etudiant={item} />
//       </div>
//     );
//   });
//   return <div className="flex justify-center items-center p-4 m-auto mt-7">
//       <div className=" bg-white rounded-xl p-7 sm:w-[65vw] w-[80vw] relative">
//           <div className="w-full rounded-xl overflow-hidden">
//             <h2 className="font-bold text-main_color">group: Ing-A2-GL-G3</h2>
//               {listEtudiant}
//               <div className="flex justify-between items-center absolute 	sm:bottom-[-8vh] bottom-[-12vh] w-full flex-wrap ">
//                <span className=" inline-block max-w-full p-3 font-semibold	text-neutral-600">{`Consultez ${(pageNumber-1)*pageSize+1}-${pageNumber*pageSize>groupMates.length?groupMates.length:pageNumber*pageSize} de ${groupMates.length} d'etudiants`} </span>
//                <ConfigProvider theme={themePagination}>
//                     <Space>
//                     <Pagination current={pageNumber} onChange={onChangePage} total={groupMates.length} responsive pageSize={pageSize} className=" sm:my-2 pr-7  "/>
//                     </Space>
//                 </ConfigProvider>
//             </div>
//           </div>
//       </div>
//   </div>;
// };

// export default ListeGroup;

import React, { useEffect, useState } from "react";
import { ConfigProvider, Pagination, Space } from "antd";
import CardEtudiant from "../../components/listeGroupe/CardEtudiant";
import { themePagination } from "../../Utils/theme/themPagination";
import { useClassmates } from "./ListGroupeAPIs";

const ListeGroup = () => {
  // State variables
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  const {isLoading, isError, error, data} = useClassmates()
  const [groupMates] = useState([
    {
      nom:"nom_Etudiant",
      num_inscription:"147855",
      avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
    {
      nom:"nom_Etudiant",
      num_inscription:"147855",
      avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
    {
      nom:"nom_Etudiant",
      num_inscription:"147866",
      avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
    {
      nom:"nom_Etudiant",
      num_inscription:"147866",
      avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
    {
      nom:"nom_Etudiant",
      num_inscription:"147866",
      avatar:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
  ]);


  // Update displayed students when page number changes
  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const sixStudents = data?.data?.data?.etudiants?data.data.data.etudiants.slice(startIndex, endIndex):groupMates.slice(startIndex, endIndex);
    setSixStudents(sixStudents);
    console.log(sixStudents)
  }, [pageNumber,data]);

  // Display only a subset of students based on page number
  const [sixStudents, setSixStudents] = useState([]);
  const listEtudiant = sixStudents.map((student, index) => (
    <div key={index}>
      <CardEtudiant etudiant={student} />
    </div>
  ));


//error and loading handler
  if(isLoading) {
    return <h2>loading...</h2>
  }
  if(isError) {
    alert(error.response.data.message)
    return <h2>{error.message}</h2>
  }
  // Render component
  return (
    <div className="flex justify-center items-center p-4 m-auto mt-7">
      <div className="bg-white rounded-xl p-7 sm:w-[65vw] w-[80vw] relative">
        <div className="w-full rounded-xl overflow-hidden">
          <h2 className="font-bold text-main_color">Group: {data?.data?.data.filiere.nomFiliere}-{data?.data?.data.niveau.nomNiveau}-{data?.data?.data.specialite.nomSpecialite}-{data?.data?.data.groupe.nomGroupe}</h2>
          {listEtudiant}
          <div className="flex justify-between items-center absolute sm:bottom-[-8vh] bottom-[-12vh] w-full flex-wrap">
            <span className="inline-block max-w-full p-3 font-semibold text-neutral-600">{`Consultez ${(pageNumber - 1) * pageSize + 1}-${Math.min(pageNumber * pageSize, data?.data?.data?.etudiants?.length)} de ${data?.data?.data?.etudiants?.length} d'étudiants`}</span>
            <ConfigProvider theme={themePagination}>
              <Space>
                <Pagination
                  current={pageNumber}
                  onChange={setPageNumber}
                  total={data?.data?.data?.etudiants?.length}
                  responsive
                  pageSize={pageSize}
                  className="sm:my-2 pr-7"
                />
              </Space>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeGroup;
