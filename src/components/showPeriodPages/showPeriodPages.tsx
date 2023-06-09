import React from 'react'
import uniqid from 'uniqid'

type Props = {
  setItemPerPage: (number: number)=> void
  itemPerPage: number
  label:string
  setCurrentPage: (number: number)=> void
}

export const ShowPeriodPages = ({setItemPerPage, itemPerPage, label, setCurrentPage}: Props) => {

  const period = [8,20,50]  
  const styleButton = 'font-medium  text-inActive px-2 py-1 rounded-lg hover:text-text'

  const periodPages = period.map((period)=>{
    return (
        <button onClick={()=>{setItemPerPage(period); setCurrentPage(1) }} 
                className= { period !== itemPerPage ? styleButton : `${styleButton} text-text bg-active px-3 py-1`} key = {uniqid()}>{period}</button>
    )
  })

  return (
    <div className='items-center'>
      <span className='mr-1 text-inActive'>{label}</span>
      <span className='mr-5'> [ {periodPages} ]</span>
    </div>
  )
}

