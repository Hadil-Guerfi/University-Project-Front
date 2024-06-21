import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function CardActualite({titre, datePub, horaire,description,fichier_attache,_id}) {
  const date = new Date(datePub);
  const dateUpdate = new Date(horaire)
// Get the day name
const options = { weekday: 'long' }; // Specify 'long' for full day name
const dayName = date.toLocaleDateString('en-US', options);

// Get the month name
const monthOptions = { month: 'long' }; 
// Specify 'long' for full month name
const monthName = date.toLocaleDateString('en-US', monthOptions);

// Get the day of the month
const dayOfMonth = date.getDate();

//Get the year
const year = date.getFullYear();
// Get the hour
let hour = dateUpdate.getHours();
hour = hour.toString().padStart(2, '0');
// Get the minute
let minute = dateUpdate.getMinutes();
minute = minute.toString().padStart(2, '0');

  return (
    <div className='relative'>
    <div className='flex justify-between items-center gap-3 p-6 bg-white m-8 flex-wrap min-w-fit before:block before:bg-main_color before:absolute before:h-full before:w-1 before:left-8 before:top-0'>
        <div className='breifInfo flex flex-wrap justify-between md:gap-9 gap-4 text-xs w-[70%] '>
            <div className='font-semibold flex-1'>{titre}</div>
            <div className='font-semibold text-main_color flex-1'>publié le: {dayName} {dayOfMonth} {monthName} {year} </div>
            <div className='font-extralight	flex-1'>{hour}:{minute}</div>
        </div>
        <div className='consulter'> 
        <Link to={`actualite/${_id}`} state={{titre, datePub, horaire,description,fichier_attache}} className="link">
         <button className='px-6 py-2 bg-main_color text-white rounded-full text-xs '>consulter</button>
         </Link>
         </div>
    </div>
    </div>
  )
}

export default CardActualite