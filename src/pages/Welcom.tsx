import {Link} from "react-router-dom"
import Bg from "../components/background/bg"

interface Props {

}

export const Welcome = (props: Props) => {
  return (
    <div className='h-full w-full py-14 bg-bg flex flex-col justify-center px-52'>
      <Bg/>
      <div className="text-text flex flex-col z-50  h-full">
          Выберите DEX
      </div>
    </div>
  )
}
