import React from 'react'
import CardLivre from './CardLivre'
import { ConfigProvider, Pagination, Space } from 'antd';
import { themePagination } from '../../Utils/theme/themPagination';
function ListLivres({themes, pageNumber, total, onChangePage, setVisibility, setItemDetails}) {
  const pageSize = 9 //le nombre d'ouvrages per page
  return (
    <div className='relative w-full'>
    <div className=" grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-3 gap-4  	w-full min-w-fit">
    {themes.map((theme, index) => (
      <CardLivre key={index} item={theme}  setVisibility={setVisibility} setItemDetails={setItemDetails}/>
    ))}
  </div>
  <div className="flex justify-between items-center absolute 	sm:bottom-[-5.5vh] bottom-[-12vh] w-full flex-wrap ">
               <span className=" inline-block max-w-full p-3 font-semibold	text-neutral-600">{`Consultez ${(pageNumber-1)*pageSize+1}-${pageNumber*pageSize>total?total:pageNumber*pageSize} de ${total} d'etudiants`} </span>
               <ConfigProvider theme={themePagination}>
                    <Space>
                    <Pagination current={pageNumber} onChange={onChangePage} total={total} responsive pageSize={9} className=" 	"/>
                    </Space>
                </ConfigProvider>
            </div>
  
  </div>
  )
}

export default ListLivres