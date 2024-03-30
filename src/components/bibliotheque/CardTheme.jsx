import React from 'react'

function CardTheme({themeColors, indexColor, item}) {
  return (
    <div  className="flex  flex-1 ">
          <div className={`w-10 h-10 rounded-full ${themeColors[indexColor]} `}></div>
          <div className="flex flex-col  ml-2  ">
            <p className="max-w-full font-thin text-sm">{item.theme}</p>
            <h3 className="max-w-full font-bold text-lg	text-main_color">{item.nb}</h3>
          </div>
        </div>
  )
}

export default CardTheme