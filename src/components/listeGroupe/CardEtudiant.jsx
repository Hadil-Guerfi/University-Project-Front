import React from 'react'
import { Avatar } from "antd";

function CardEtudiant({etudiant}) {
  return (
    <div className="flex gap-4 justify-between items-center bg-white w-full mt-4">
    <div className="flex  gap-3 justify-between items-center">
     <div className="pt-3"><Avatar src={etudiant.avatar} className='mb-3 ml-3 block'/></div> 
     <h3 className="font-semibold">{etudiant.nom} {etudiant.prenom}</h3>
    </div>
    <div className="font-semibold text-main_color">
     {etudiant.num_inscriptionE}
    </div>
  </div>
  )
}

export default CardEtudiant