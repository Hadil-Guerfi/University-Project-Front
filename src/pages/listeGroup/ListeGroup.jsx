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

const ListeGroup = () => {
  // State variables
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 2;
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
    const sixStudents = groupMates.slice(startIndex, endIndex);
    setSixStudents(sixStudents);
  }, [pageNumber]);

  // Display only a subset of students based on page number
  const [sixStudents, setSixStudents] = useState([]);
  const listEtudiant = sixStudents.map((student, index) => (
    <div key={index}>
      <CardEtudiant etudiant={student} />
    </div>
  ));

  // Render component
  return (
    <div className="flex justify-center items-center p-4 m-auto mt-7">
      <div className="bg-white rounded-xl p-7 sm:w-[65vw] w-[80vw] relative">
        <div className="w-full rounded-xl overflow-hidden">
          <h2 className="font-bold text-main_color">Group: Ing-A2-GL-G3</h2>
          {listEtudiant}
          <div className="flex justify-between items-center absolute sm:bottom-[-8vh] bottom-[-12vh] w-full flex-wrap">
            <span className="inline-block max-w-full p-3 font-semibold text-neutral-600">{`Consultez ${(pageNumber - 1) * pageSize + 1}-${Math.min(pageNumber * pageSize, groupMates.length)} de ${groupMates.length} d'étudiants`}</span>
            <ConfigProvider theme={themePagination}>
              <Space>
                <Pagination
                  current={pageNumber}
                  onChange={setPageNumber}
                  total={groupMates.length}
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
