import React from 'react'
import livre from '../../assests/livre.png'

function CardOuvragePlusEmprunte({ouvrage}) {
  return (
    <div>
        <div className="p-5 w-full">
            <div className="rounded-xl bg-loginBg flex justify-center p-3"><img src={livre} alt="livre" className="w-[7vw]"/></div>
            <div className="p-3 divtext ">
              <h4 className="font-bold text-main_color">{ouvrage.titre}</h4>
              <p>{ouvrage.auteur}</p>
            </div>
          </div>
    </div>
  )
}

export default CardOuvragePlusEmprunte