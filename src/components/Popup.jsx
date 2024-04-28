import React from 'react'
import cercles from '../assests/cercles.png'


function PopupToRent({ title, content, visibility, setVisibility }) {
   
    
    
    const handleInnerClick = (e) => {
      // Prevent click event propagation
      e.stopPropagation();
    };
  
    const handleOuterClick = () => {
      setVisibility('invisible');
    };

  return (
    <div onClick={handleOuterClick} className={`h-[100vh] absolute bg-bgPopup top-0 bottom-0 left-0 w-[100vw] flex items-center justify-center ${visibility} transition duration-2000 ease-in-out`}>
        <div onClick={handleInnerClick} className='bg-white w-[50vw] rounded-xl'> {/* J'ai élimine h-[55vh] puisque j'ai besoin d'un popup plus petit */}
            <div className='h-[10vh] bg-main_color rounded-t-xl  bottom-0'>
                <div className='w-full relative h-full'> 
                  <img src={cercles} alt="cercles" className=' w-auto h-[7vh] absolute right-2 bottom-0' />
                  <h1 className='font-bold text-xl text-white p-4'>{title}</h1>
                </div>
            </div>
            <div className='p-4'>
            {content}
            </div>
            
        </div>
        
    </div>
  )
}

export default PopupToRent







