import React from 'react'
import CardOuvragePlusEmprunte from '../../components/bibliotheque/CardOuvragePlusEmprunte'
function OuvragesLesPlusEmprunte({topOuvrages}) {
  const topOuvrageEmprunte = topOuvrages.map((element,index)=> <CardOuvragePlusEmprunte key={index} ouvrage={element}/>)
  return (
    <div className='w-full'>
         {topOuvrageEmprunte}
    </div>
  )
}

export default OuvragesLesPlusEmprunte