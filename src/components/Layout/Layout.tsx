import { Header } from '../header/Header'
import { Outlet} from "react-router-dom"
import { observer } from "mobx-react-lite"
import {Footer} from '../footer/Footer';
import { ButtonTokens } from '../buttonsGroupe/ButtonGroupeForm';
import uniqid from 'uniqid';
import { store } from '../../Store/store';
import { useEffect, useState } from 'react';
import {CSSTransition} from 'react-transition-group'

interface Props {}

const LayoutComponent = (props: Props) => {

const {activeButtonDex, buttonDex, activePage, updateActiveButtonDex, updateHandlerButtonDex, handlerButtonDex } = store





useEffect(() => {
  updateActiveButtonDex(window.location.pathname.split('/')[1])
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