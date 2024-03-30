import React from 'react'
import livre from '../../assests/livre.png'
function OuvragesLesPlusEmprunte() {
  return (
    <div className='w-full'>
         <div className="p-5 w-full">
            <div className="rounded-xl bg-loginBg flex justify-center p-3"><img src={livre} alt="livre" className="w-[7vw]"/></div>
            <div className="p-3 divtext ">
              <h4 className="font-bold text-main_color">Clean Code</h4>
              <p>auteur</p>
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-xl bg-loginBg flex justify-center"><img src={livre} alt="livre" className="w-[7vw]"/></div>
            <div className="p-3 divtext ">
              <h4 className="font-bold text-main_color">Clean Code</h4>
              <p>auteur</p>
            </div>
          </div>
    </div>
  )
}

export default OuvragesLesPlusEmprunte