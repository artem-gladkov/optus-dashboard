import React from 'react'

type Props = {
    children: React.ReactNode,
}

const ButtonsCharts = ({children}: Props) => {



  return (
    <button>
        
        {
            children
        }
        
        </button>
  )
}

export default ButtonsCharts