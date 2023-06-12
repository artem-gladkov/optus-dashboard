import { Header } from '../header/Header'
import { Outlet} from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from '../../Store/store';
import { useEffect } from 'react';

interface Props {}

const LayoutComponent = (props: Props) => {

const { updateActiveButtonDex } = store





useEffect(() => {
  updateActiveButtonDex(window.location.pathname.split('/')[1])
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div className='flex flex-col w-full h-full justify-start text-text'>
        <div className='h-22 w-full z-50'>
          <Header/>
        </div>
      <div className='z-20'>
          <Outlet />
      </div>
      <div className=''>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export const Layout = observer(LayoutComponent)