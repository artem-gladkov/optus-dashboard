import {Link, NavLink} from "react-router-dom"
import { observer } from "mobx-react-lite"



interface Props  {}

const RoutesNavigationComponent = (props: Props) => {
  return (
        <header className="w-full h-full flex justify-center"> 
            <div className='flex-col w-1/12 fixed h-full bg-green-200 bg-opacity-30 flex items-center justify-start'>
              <div className="font-bold mt-6 mb-6">
                <Link to="/">LOGO</Link>
            </div>
           <nav className='flex flex-col'>
                <NavLink className='m-1  text-xl text-cyan-900 font-medium hover:text-cyan-700 transition-all duration-400' to="/">Overview</NavLink>
                <NavLink className='m-1  text-xl text-cyan-900 font-medium hover:text-cyan-700 transition-all duration-400' to="/tokens">Tokens</NavLink>
                <NavLink className='m-1  text-xl text-cyan-900 font-medium hover:text-cyan-700 transition-all duration-400' to="/pairs">Pairs</NavLink>
            </nav> 

            </div>
        </header>
  )
}

export const RoutesNavigation = observer(RoutesNavigationComponent)