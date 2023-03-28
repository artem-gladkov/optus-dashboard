import React from 'react'
import "./bg.css"

type Props = {
  type?: "single" | "page"
}

const Bg = (props: Props) => {
  return (
    <div className='swapanimation  relative z-10  bg-bg h-full w-full'>
      <div className='swapbutton h-full w-full z-10 flex justify-center bg-bg '>
          <span className=''></span>
          <span className='-ml-80'></span>
          <span className='-ml-80'></span>
          <span className='-ml-80'></span>
          <span className='-ml-80'></span>
          <span className='-ml-80'></span>
          <span className='-ml-80'></span>
      </div>
    </div>

  )
}

export default Bg