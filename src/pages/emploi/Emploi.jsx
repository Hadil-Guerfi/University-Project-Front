import { Document, Page, pdfjs } from 'react-pdf';
import  {useEffect, useRef, useState} from 'react'
import { useReactToPrint } from "react-to-print";
import { Button } from 'antd';
import {fetchEmploi} from "./EmploiAPI";
// Définir le chemin vers le worker PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Emploi() {

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [pdfPath, setPdfPath] = useState(null);

  // function onDocumentLoadSuccess({numPages}){
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  
  useEffect(() => {
    fetchEmploi().then(path => setPdfPath(path)).catch(error => console.error(error));
    console.log(pdfPath);
  }, []);
  

  return (
    <div className="bg-yellow py-6">
      {/* <div className='flex flex-col items-end md:px-20  '>
        <Button onClick={handlePrint} className="print__button bg-white text-main_color flex justify-center items-center w-20 h-10 text-base rounded-3xl border-main_color border-2 hover:scale-105 transition duration-300 ease-in-out hover:shadow-indigo-200 hover:shadow-md" htmlType="reset">
          Print
        </Button>
      </div> */}
      <div className='max-h-[80dvh] flex justify-center'>
        <div ref={componentRef} className='overflow-y-auto'>
          {/* {pdfPath && (
            <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error} >
              <Page pageNumber={1} />
            </Document>
          )} */}
          <div ref={componentRef} className=' min-w-[40vw] h-[80vh]'>
             {pdfPath && (
               <embed src={pdfPath} type="application/pdf" className='w-full h-full'/>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emploi;

