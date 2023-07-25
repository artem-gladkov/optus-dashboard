import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { store } from '../../Store/store';
import { CustomLink } from '../customLink/CustomLink';
import { useEffect } from 'react';

interface Props {
    dexProp: string
}

const NavigationsComponent = ({dexProp}: Props) => {
    const {updateActivePage,  updateHandlerButtonDexBo, getActiveButtonDex, updateActiveButtonDex} = store
    const {dex} = useParams()
    const pairs = 'pairs'
    const tokens = 'tokens'
    const dexoverview = 'dexoverview'
    useEffect(() => {
        dex ? updateActiveButtonDex(window.location.pathname.split('/')[2]) : updateActiveButtonDex('OPTUS')
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      console.log(useParams(), window.location.pathname.split('/'))
    return (
        <nav  className='flex center text-inActive font-medium text-sm'>   
            <CustomLink onClick={()=>{updateHandlerButtonDexBo(true);updateActivePage('')}} className='flex  m-1  hover:text-text transition-all duration-400 px-4 py-2 rounded ' 
                to={`overview/${dex ? dex : getActiveButtonDex}`}>Overview</CustomLink>
            <CustomLink onClick={()=>{updateActivePage(tokens)}} className='m-1  hover:text-text transition-all duration-400 px-4 py-2 rounded' 
                to={`overview/${dex ? dex : getActiveButtonDex}/${tokens}`}>Tokens</CustomLink>
            <CustomLink onClick={()=>{updateActivePage(pairs)}} className='m-1   hover:text-text transition-all duration-400 px-4 py-2 rounded' 
                to={`overview/${dex ? dex : getActiveButtonDex}/${pairs}`}>Pairs</CustomLink>
            <CustomLink className='m-1   hover:text-text transition-all duration-400 px-4 py-2 rounded' 
                to={`/${dexoverview}`}>Overview dex</CustomLink> 
        </nav> 
    )
}

export const Navigations = observer(NavigationsComponent)
