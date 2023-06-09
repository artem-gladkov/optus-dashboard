import {Link} from "react-router-dom"
import Bg from "../components/background/bg"

interface Props {

}

export const Welcome = (props: Props) => {
  return (
    <div className='className="h-full py-14 relative  bg-bg flex flex-col justify-center mt-24'>
      <Bg/>
      <div className="flex w-full relative flex-col text-text z-50">
          <div>

          </div>
      </div>
    </div>
  )
}
