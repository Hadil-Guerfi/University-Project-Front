import React from 'react'
import CardActualite from './CardActualite'
import { Button, ConfigProvider, Select, Modal, Pagination, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { themePagination } from '../../Utils/theme/themPagination';

function ListActualite({actualites, handleChange, numberPage, onChangePage, total}) {
    const listActualite = actualites.map((item,index)=> {
        return (
          <CardActualite  key={index} titre={item.titre} datePub={item.datePub} horaire={item.updatedAt}description={item.description} fichier_attache={item.fichier_attache} _id={item._id}/>
        )
      })
  return (
    <div>
             <div className="m-8 flex justify-between flex-wrap">
           <ConfigProvider
             wave={{ disabled: true }}
             theme={{
               components: {
                 Button: {
                   defaultActiveBorderColor	: "#4D44B5",
                   defaultActiveColor : "#4D44B5",
                   defaultHoverBorderColor: "#4D44B5",
                   defaultHoverColor: "#4D44B5"
                 }
               }
             }}
           >
            <Button className="rounded-2xl w-[20vw] bg-white text-left min-w-fit"  icon={<SearchOutlined />}><input placeholder="Search" className="w-[80%] outline-none"></input></Button>
           </ConfigProvider>
           <Select 
           className="w-[10vw] min-w-fit"
           defaultValue="plus récent"
           style={{
             width: 120,
           }}
           onChange={handleChange}
           options={[
             {
               value: 'recent',
               label: 'plus récent',
             },
             {
               value: 'date',
               label: 'Plage de dates',
             },
     
           ]}
         />
         </div>
        {/* {listActualite} */}
        {listActualite.length>=1 ? listActualite :"Pas d'actualités"}
        <ConfigProvider theme={themePagination}>
                    <Space>
                    <Pagination current={numberPage} onChange={onChangePage} total={total} responsive pageSize={4} className=" 	"/>
                    </Space>
        </ConfigProvider>
    </div>
  )
}

export default ListActualite