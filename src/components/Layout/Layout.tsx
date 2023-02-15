import { RoutesNavigation } from '../header/RoutesNavigation'
import { Outlet} from "react-router-dom"
import { observer } from "mobx-react-lite"
import {Footer} from '../footer/Footer';


interface Props {}

const LayoutComponent = (props: Props) => {

  return (
    <div className='flex  h-full '>
      <RoutesNavigation/>

      <div className='w-4/5'>
      <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export const Layout = observer(LayoutComponent)