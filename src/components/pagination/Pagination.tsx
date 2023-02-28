import React from 'react'
import uniqid from 'uniqid'


interface Props  {
    totalItem: number;
    itemPerPage: number;
}

export const Pagination = ({totalItem, itemPerPage}: Props) => {
  let pages = []
  
  for(let i =1 ; i <=Math.ceil(totalItem/itemPerPage); i++){
    pages.push(i)
  }

  const pagesComponent = pages.map((page)=>{
    return (
        <button key = {uniqid()}>{page}</button>
    )
  })

  return (
    <div className=''>
        {pagesComponent}
    </div>
  )
}
