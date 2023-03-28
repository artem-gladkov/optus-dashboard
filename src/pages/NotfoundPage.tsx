import {Link} from "react-router-dom"
import Bg from "../components/background/bg"

interface Props {

}

export const NotfoundPage = (props: Props) => {
  return (
    <div className='h-full w-full py-14 bg-bg flex flex-col justify-center'>
      <Bg/>
      <div className="text-text flex flex-col z-50  h-full">
          <p className=" text-2xl mb-10 ">NotfoundPage </p> 
          <Link to="/">Вернуться обратно?</Link>
      </div>
    </div>
  )
}

