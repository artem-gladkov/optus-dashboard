import { RoutesNavigation } from '../header/RoutesNavigation'
import { Outlet} from "react-router-dom"
import { observer } from "mobx-react-lite"
import {Footer} from '../footer/Footer';


interface Props {}

const LayoutComponent = (props: Props) => {

  return (
    <div className='flex w-full h-full justify-start'>
      <div className='w-1/12'>
        <RoutesNavigation/>
      </div>


      <div className='w-5/6 h-full p-6'>
          <Outlet />
      </div>

      <div className='w-1/12'>
        <Footer />
      </div>

    </div>
  )
}

export const Layout = observer(LayoutComponent)