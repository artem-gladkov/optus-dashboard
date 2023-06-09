import { observer } from 'mobx-react';
import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import { store } from '../../Store/store';
import { CustomLink } from '../customLink/CustomLink';

interface Props {
    
}

const NavigationsComponent = (props: Props) => {
    const {activeButtonDex, buttonDex,updateActivePage, activePage, updateHandlerButtonDexBo } = store
    const {dex} = useParams()
    const pairs = 'pairs'
    const tokens = 'tokens'
    const over = 'STON.fi'

    return (
        <nav  className='flex center text-inActive font-medium text-sm'>   
            <CustomLink onClick={()=>{updateHandlerButtonDexBo(true);updateActivePage('')}} className='flex  m-1  hover:text-text transition-all duration-400 px-4 py-2 rounded ' 
                to={`/${dex ? dex : activeButtonDex}`}>Overview</CustomLink>
            <CustomLink onClick={()=>{updateActivePage(tokens)}} className='m-1  hover:text-text transition-all duration-400 px-4 py-2 rounded' 
                to={`/${dex ? dex : activeButtonDex}/${tokens}`}>Tokens</CustomLink>
            <CustomLink onClick={()=>{updateActivePage(pairs)}} className='m-1   hover:text-text transition-all duration-400 px-4 py-2 rounded' 
                to={`/${dex ? dex : activeButtonDex}/${pairs}`}>Pairs</CustomLink>
        </nav> 
    )
}

export const Navigations = observer(NavigationsComponent)
