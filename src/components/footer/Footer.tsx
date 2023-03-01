import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { store } from "../../Store/store"
import { Link } from "react-router-dom"
import uniqid from "uniqid"

interface Props  {
    
}

export const Footer=observer((props: Props) => {
    
  const {footerUpdate, getFooterState, removeLocalStoreSTORE,updatebuttonFavoritesFlag} = store

  const removeItem = (item) =>{
    removeLocalStoreSTORE(item)
    footerUpdate()
    updatebuttonFavoritesFlag()
  }

  useEffect(()=>{
    footerUpdate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  const favoriteItems = getFooterState.map((item)=>{
      return ( item[0].includes('@') ? (
        <div className="text-xs font-medium mb-2" key={uniqid()}>
          <Link to={`/pairs/${item[1]}`}>{item[0].replace('@','')}</Link>
          <button className="ml-2" onClick={()=>{removeItem(item[0])}}>&times;</button>
        </div>
      ) : (<div className="text-xs mb-2  font-medium " key={uniqid()}>
        <Link to={`/tokens/${item[1]}`}>{item[0]}</Link>
        <button className="ml-2" onClick={()=>{removeItem(item[0])}}>&times;</button>
      </div>)
        
      )
  })

  return (   
        <footer className="w-full h-full flex justify-center"> 
            <div className='flex-col w-1/12 fixed h-full bg-green-200 bg-opacity-30 flex items-center justify-start'>
                <div className='flex-col h-full flex items-center'>
                    <button className='cursor-pointer w-6 h-6 mt-5'>
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M393,450a14.92,14.92,0,0,1-7.46-2L257,374.29,128.46,448A15,15,0,0,1,106,435V63a15,15,0,0,1,15-15H393a15,15,0,0,1,15,15V435a15,15,0,0,1-15,15ZM257,342a14.92,14.92,0,0,1,7.46,2L378,409.1V78H136V409.1L249.54,344A14.92,14.92,0,0,1,257,342Z"/></g></svg>
                    </button>
                       <div className="items-center mt-10">
  {favoriteItems}
                       </div>
                  </div>
            </div>
        </footer>
  )
}
)
