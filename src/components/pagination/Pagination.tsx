import uniqid from 'uniqid'
import { store } from '../../Store/store';
import { observer } from 'mobx-react-lite';


interface Props  {
    totalItem: number;
    itemPerPage: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

 const PaginationComponent = ({totalItem, itemPerPage, setCurrentPage, currentPage}: Props) => {
  let pages = []
  
  for(let i =1 ; i <=Math.ceil(totalItem/itemPerPage); i++){
    pages.push(i)
  }

  const styleButton = 'mr-3 border-2 border-spacing-2 px-2 rounded-lg hover:text-slate-200 border-violet-500 hover:border-slate-200 active:text-violet-500 active:border-violet-500'

  const pagesComponent = pages.map((page)=>{
    return (
        <button onClick={()=>{setCurrentPage(page)}} 
                className= { page !== currentPage ? styleButton : `${styleButton} text-slate-200 border-slate-200 ring-4`} key = {uniqid()}>{page}</button>
    )
  })

  return (
    <div className='p-3'>
        {pagesComponent}
    </div>
  )
}

export const Pagination = observer(PaginationComponent)