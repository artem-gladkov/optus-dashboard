import uniqid from 'uniqid'
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
  const styleButton = 'font-medium mr-3 text-inActive px-3 py-1 rounded-lg hover:text-text'
  const pagesComponent = pages.map((page)=>{
    return (
        <button onClick={()=>{setCurrentPage(page)}} 
                className= { page !== currentPage ? styleButton : `${styleButton} text-text bg-active px-3 py-1`} key = {uniqid()}>{page}</button>
    )
  })
  return (
    <div className='p-3'>
        {pagesComponent}
    </div>
  )
}

export const Pagination = observer(PaginationComponent)