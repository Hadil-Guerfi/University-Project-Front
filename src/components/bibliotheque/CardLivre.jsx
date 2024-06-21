import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Popover } from 'antd';
import livre from "../../assests/livre.png";
const { Meta } = Card;
const CardLivre = ({item, setVisibility, setItemDetails}) => {
  const [visible, setVisible] = useState(false);

  const handleRentBook = () => {
    // Logic to handle renting the book
    setItemDetails(item)
    console.log('Renting the book...');
    setVisible(false)
    setVisibility('visible')
   
  };

  const content = (
    <div>
      <p>Voulez-vous emprunter ce livre ?</p>
      <Button type="primary" onClick={handleRentBook} className=' border-main_color rounded-xl text-main_color hover:bg-main_color hover:text-white mt-2'>Empruntez</Button>
    </div>
  );
  return(
  <Card  className='w-full min-w-fit relative ' 
    actions={[
      
      <Popover responsive content={content} trigger="click"  open={visible} onOpenChange={setVisible}>
      <EllipsisOutlined key="ellipsis" className='absolute right-0 top-[-8.75rem] h-16 w-16' />
    </Popover>
    ]}
  >
    <Meta
      avatar={<Avatar src={item?.image?item.image:livre}  className='mb-3 ml-3'/>}
      title= {item.titre}
      description={`auteur: ${item.auteur} `}
      className='flex flex-col items-center text-center'
    />
  </Card>
  )
  };
export default CardLivre;