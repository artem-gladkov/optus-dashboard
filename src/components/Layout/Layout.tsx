import { Header } from '../header/Header'
import { Outlet, useParams} from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from '../../Store/store';
import { useEffect } from 'react';
import { RigthNavigations } from '../right-navigations/rigth-navigations';
import Bg from '../background/bg';

interface Props {}

const LayoutComponent = (props: Props) => {

const { updateActiveButtonDex, getActiveButtonDex } = store

const pairs = "pairs";
const tokens = "tokens";
const path = window.location.pathname === '/'
const { dex } = useParams();

useEffect(() => {
  updateActiveButtonDex(window.location.pathname.split('/')[2])
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div className='flex flex-col w-full h-full justify-start text-text'>
      
        <div className='h-22 w-full z-50'>
          <Header/>
        </div>

      <div className='z-10 flex jus'>

        {!path ? (
        <div className='w-[4%] z-50'>
        <RigthNavigations toCoins={`/overview/${dex ? dex : getActiveButtonDex}/${tokens}`} toPairs={`/overview/${dex ? dex : getActiveButtonDex}/${pairs}`} />
      </div>
        ) : null}        
        <div className={`${!path ? 'w-[96%]' : 'w-[100%]'}  mt-8`}>
        <Outlet />
        </div>
      </div>
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export const Layout = observer(LayoutComponent)