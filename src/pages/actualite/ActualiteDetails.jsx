import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function ActualiteDetails() {
const location=useLocation();
const navigate = useNavigate();
  const { titre, datePub, horaire, description, fichier_attache } = location.state;

  const date = new Date(datePub);
  const dateUpdate = new Date(horaire);

  // Get the day name
  const options = { weekday: 'long' };
  const dayName = date.toLocaleDateString('en-US', options);

  // Get the month name
  const monthOptions = { month: 'long' };
  const monthName = date.toLocaleDateString('en-US', monthOptions);

  // Get the day of the month
  const dayOfMonth = date.getDate();

  // Get the year
  const year = date.getFullYear();

  // Get the hour and minute
  let hour = dateUpdate.getHours().toString().padStart(2, '0');
  let minute = dateUpdate.getMinutes().toString().padStart(2, '0');

  // Determine the type of attachment (image, pdf, or link)
  let attachmentContent;
  if (fichier_attache.toLowerCase().endsWith('.pdf')) {
    attachmentContent = <embed src={fichier_attache} type="application/pdf" width="100%" height="500px" />;
  } else if (fichier_attache.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    attachmentContent = <img src={fichier_attache} alt="Attachment" className="max-w-full h-[50vh]" />;
  } else {
    attachmentContent = <a href={fichier_attache} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>Attachment Link</a>;
  }

  return (
    <div className="container mx-auto p-8   w-[60vw]">
    <div className='flex flex-wrap justify-around'>
    <div className='flex-1'>
      <h1 className="text-2xl font-bold mb-4 text-main_color">{titre}</h1>
      <div className="flex mb-4">
        <div className="w-1/2">
          <p className="text-sm font-semibold">Published on: {dayName}, {dayOfMonth} {monthName} {year}</p>
          <p className="text-sm font-semibold">at: {hour}:{minute}</p>
        </div>
      </div>
      <div className="mb-4">{description}</div>
      <button className="px-4 py-2 bg-main_color text-white rounded-md hover:bg-main_color" onClick={() => navigate(-1)}>
        Précedent
      </button>
      </div>
      <div className="mb-4">{attachmentContent}</div>
    </div>
    </div>
  );
}

export default ActualiteDetails;
