import React, { useState } from "react";
import ListLivres from "../../components/bibliotheque/ListLivres.jsx";
import CardTheme from "../../components/bibliotheque/CardTheme.jsx";
import { useEmprunter, useOuvrage, useOuvrageByTheme} from "./BiblioAPIs.js";
import { Select } from 'antd';
import OuvragesLesPlusEmprunte from "./OuvragesLesPlusEmprunte.jsx";
import PopupToRent from "../../components/Popup.jsx";
import livre from "../../assests/livre.png";


const Bibliotheque = () => {
  const themeColors = ['bg-jaune','bg-main_color', 'bg-orange'];
  const [themeFilter, setThemeFilter] = useState("Tous")
  const [pageNumber, setPageNumber] = useState(1);
  const [visibility, setVisibility] = useState('invisible')
  const [itemDetails, setItemDetails] = useState({}) //this object will contain a selected ouvrage 
  const {isLoading, isError, error, data} = useOuvrage(pageNumber, themeFilter)
  const {data: data2} = useOuvrageByTheme();
  const closePopup = () =>{
    setVisibility('invisible')
  }

  // Success and error handlers for emprunter mutation
  const onSucessEmprunter = ()=>{
    setVisibility("invisible")
    alert("emprunt success")
  
  }

  const onErrorEmprunter = ()=> {
    alert("emprunt failed")
  
  }
  const { mutate: emprunter } = useEmprunter(onSucessEmprunter, onErrorEmprunter);
  const EmpruntHandler = ()=>{
    emprunter({id_ouvrage: itemDetails?._id});
  }


  if(isLoading) {
    return <h2>loading...</h2>
  }
  if(isError) {
    return <h2>{error.message}</h2>
  }
  const onChangePage = (page) => {
    setPageNumber(page);
  };
  

  /** **********************************************Start the jsx element is the elka3bourat l malwnin *******w filter**************************************/
     let indexColor = 0;
     
     //whenever I select an item to filter 'ouvrages' the default value will reset by the selected item
     const onchangeFilter = (value, option) => {
       setThemeFilter(option.label);
       setPageNumber(1);
     } 

     // arr is an array that contain  themes of ouvrages 
     const arr = [
       {
         value: "tous",
          label: "Tous"
      }
     ];

     //fill the arr by the themes that are got from the backend
      data2?.data.data.ouvragesByTheme.map((element,index)=>{
       arr.push ( {
         value: index,
         label: element.theme
       })
     })

 // Categories component for themes
  const categories = (
    <div className="flex items-center flex-wrap gap-2 mb-2 mt-1 bg-white rounded-xl p-3 max-w-full">
    {data2?.data?.data?.ouvragesByTheme ? (
      <>
        {data2.data.data.ouvragesByTheme.slice(0,4).map((item, index) => {
          indexColor = (indexColor + 1) % themeColors.length;
          return <CardTheme key={index} indexColor={indexColor} themeColors={themeColors} item={item} />;
        })}
        <CardTheme
          key={"autre"}
          indexColor={2}
          themeColors={themeColors}
          item={{ theme: "Autre", nb: data2?.data?.data?.autre_nb }}
        />
        <Select
           showSearch
           style={{
             width: 200,
           }}
           placeholder="Search to Select"
           optionFilterProp="children"
           filterOption={(input, option) => (option?.label ?? '').includes(input)}
           filterSort={(optionA, optionB) =>
             (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
           }
           defaultValue= {themeFilter}
           options = { arr }
           onChange={onchangeFilter}
         />
      </>
    ) : (
      <p>No data available</p>
    )}
  </div>
  );

  /*************************************** End l ka3bourat el malwnin****w*****Filter***************************/

/*************************************************Start contenu mte3 l popup mte3 emprunter ouvrage *********************************************************/

     const content = (
       <div className='relative'>
       <div className='flex justify-between gap-4'>
           <div><img src={livre} alt="livre" className='w-[40vh]' /></div>
           <div className='w-full flex justify-center items-center'>
               <div className='text-justify'>
                 <h3> <span className='text-main_color font-bold text-justify'>Titre:</span> {itemDetails.titre} </h3>
                 <p> <span className='text-main_color font-bold'>Auteur:</span> {itemDetails.auteur}</p>
                 <p> <span className='text-main_color font-bold'>nombre: exemplaires:</span> {itemDetails.nb_exemplaire}</p>
                 <p><span className='text-main_color font-bold'>nombre: exemplaires disponibles:</span> {itemDetails?.nb_exemplaire_disponible}</p>
                 <p><span className='text-main_color font-bold'>Theme:</span> {itemDetails?.id_theme?.nom_theme}</p>
                 <p><span className='text-main_color font-bold'>Type:</span> {itemDetails?.id_type?.nom_type_ouvrage}</p>
               </div>
              
     
           </div>
       </div>
            <div className='absolute right-0'>
               <button className='border-solid border-main_color rounded-full px-7 border-2 text-main_color py-4 m-3 ' onClick={closePopup}>Annuler</button>
               <button className=' rounded-full  bg-main_color px-7 border-2 text-white py-4 m-3' onClick={EmpruntHandler}>Emprunter</button>
           </div>
       </div>
     );

/*******************************************************End Contenu popup************************************************* */


 //this array is a result of a request we send to the backend specifing the theme(by default "tous"), the sizeOfThePage(by default 9) and the NumberPage(by default 1) 
  const themesData = data?.data.data.ouvrages;

  return(
  <div className="">  
     {categories}
     <div className="flex flex-col sm:flex-row  sm:items-start justify-between items-center "> 
       <ListLivres themes={themesData} pageNumber={pageNumber} total={data?.data.data.total} onChangePage={onChangePage} setItemDetails={setItemDetails} className="w-full" setVisibility={setVisibility}/>
      <div className="sm:w-[27vw] w-full rounded-xl ml-2 ">
        <h3 className="text-main_color font-bold text-center text-basic sm:text-xl m-5 ">Les Livres les plus empruntés</h3>  
        <div className="bg-white rounded-xl max-h-[60vh] overflow-hidden w-full">
         <OuvragesLesPlusEmprunte  />

        </div>
       </div>
     </div>
    
  <PopupToRent content={content} title={"Emprunter un ouvrage"} visibility={visibility} setVisibility={setVisibility}/>
  </div>
)};

export default Bibliotheque;
