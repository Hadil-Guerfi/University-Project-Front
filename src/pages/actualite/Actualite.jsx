import CardActualite from "../../components/actualité/CardActualite";
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Select, Modal } from 'antd';
import Draggable from 'react-draggable';
import ListActualite from "../../components/actualité/ListActualite";
import { useActualite } from "./ActualiteAPIs";
import { Link, useLocation } from 'react-router-dom';


const Actualite = () => {
  const location = useLocation()
  console.log(location.pathname)
  /************* start model logic ********************/
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [dateDebutFin, setDateDebutFin] = useState({dateDebut:'0',dateFin:'0'});
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
    console.log(dateDebutFin);
    
  };
  const handleCancel = (e) => {
    setDateDebutFin({dateDebut:'0',dateFin:'0'});
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setDateDebutFin({...dateDebutFin, [name]: value});
};

  /********************************* End Modal Logic *****************************/
  
const handleChange = (value) => {
  setFilter(value);
  if(value === 'date'){
    setOpen(true);
  }
  else{
    setDateDebutFin({dateDebut:'0',dateFin:'0'})
  }
};

const onChangePage = (page) => {
  setNumberPage(page);
};

const [numberPage, setNumberPage] = useState(1);
const [filter, setFilter] = useState('recent');
const {isLoading, isError, error, data} = useActualite(numberPage, dateDebutFin.dateDebut, dateDebutFin.dateFin)
console.log(data?.data?.data.actualites)
let actualitess = data?.data?.data?data.data.data.actualites:[]
  const actualites = [
    {
      titre: "Forum entreprise issatso",
      datePub: "publié le : samedi 18 november 2023",
      horaire: "19:05",
    },
    {
      titre: "Forum entreprise issatso",
      datePub: "publié le : samedi 18 november 2023",
      horaire: "19:05",
    },
    {
      titre: "Forum entreprise issatso",
      datePub: "publié le : samedi 18 november 2023",
      horaire: "19:05",
    },
    {
      titre: "Forum entreprise issatso",
      datePub: "publié le : samedi 18 november 2023",
      horaire: "19:05",
    },
  ];

  return <div className="relative">
    
  <ListActualite actualites={actualitess} handleChange={handleChange} numberPage={numberPage} onChangePage={onChangePage} total={data?.data?.data?.totalActualites} onChangeDate={onChangeDate}/>
  {/*  **********************************Start Modal jsx*****************************/}
  <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
           Plage de dates
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        
        <div className="flex justify-around">
          <div>
            <label htmlFor="debut">Heure de début</label>
            <br />
            <input type="date" id="debut" name="dateDebut" onChange={onChangeDate} className="border-2	border-zinc-800	px-3 my-2"/>
          </div>
          <div>
            <label htmlFor="fin">Heure de fin</label>
            <br />
            <input type="date" id="fin" name="dateFin" onChange={onChangeDate} className="border-2	border-zinc-800	px-3 my-2" />
          </div>
        </div>
       
      </Modal>
  {/* ***************************************End Modal jsx ****************************** */}
  </div>;
};

export default Actualite;
