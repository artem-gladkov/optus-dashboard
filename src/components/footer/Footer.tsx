import { observer } from "mobx-react-lite"

interface Props  {
    
}

const FooterComponent = (props: Props) => {
  return (
    // <div className='w-1/6'>
    //   <div className='h-full bg-green-200 bg-opacity-30 rounded-l-3xl'>
    //           <div className='flex-col h-full flex items-center justify-start'>
    //             <button className='cursor-pointer w-6 h-6 mt-5'>
    //               <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M393,450a14.92,14.92,0,0,1-7.46-2L257,374.29,128.46,448A15,15,0,0,1,106,435V63a15,15,0,0,1,15-15H393a15,15,0,0,1,15,15V435a15,15,0,0,1-15,15ZM257,342a14.92,14.92,0,0,1,7.46,2L378,409.1V78H136V409.1L249.54,344A14.92,14.92,0,0,1,257,342Z"/></g></svg>
    //             </button>
    //           2023
    //           </div>
    //     </div> 
    // </div>
   
        <footer className="absolute right-0 w-20"> 
            <div className='flex-col fixed h-full  flex items-start justify-start bg-green-200 bg-opacity-30 rounded-l-3xl p-6'>
                     <div className='flex-col h-full flex items-center justify-start'>
                <button className='cursor-pointer w-6 h-6 mt-5'>
                 <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M393,450a14.92,14.92,0,0,1-7.46-2L257,374.29,128.46,448A15,15,0,0,1,106,435V63a15,15,0,0,1,15-15H393a15,15,0,0,1,15,15V435a15,15,0,0,1-15,15ZM257,342a14.92,14.92,0,0,1,7.46,2L378,409.1V78H136V409.1L249.54,344A14.92,14.92,0,0,1,257,342Z"/></g></svg>
                </button>
               2023
             </div>

            </div>
        </footer>
  )
}

export const Footer = observer(FooterComponent)