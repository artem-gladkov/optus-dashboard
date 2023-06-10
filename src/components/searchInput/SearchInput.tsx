import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import uniqid from 'uniqid'
import { observer } from 'mobx-react';
import { store } from '../../Store/store';
import  SearchSvg from '../svg/search'
import { CloseInput } from '../svg/Icon';
import { toJS } from 'mobx';

interface Props {
   getPairs?: any
   getTokens?: any
   hiddenNav?: (hidden: boolean) => void
}


const SearchInputComponent = ({getTokens = store.getTokens, getPairs = store.getPairs, hiddenNav}: Props) => {
    console.log(toJS(getPairs))
    const {dex} = useParams()
    const [valueInput, setValueInput] = useState('')
    const searchInput = getTokens ? getTokens
        .filter((token)=>{return token.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) || token.symbol.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())  })
        .map( (token)=>{
            return (
                <li key={uniqid()} className=' bg-form hover:bg-opacity-30 cursor-pointer flex items-center my-3'>
                    <img src={token.icon} width={20} height={20} alt="token" className='mr-2 rounded-full'/>
                    <Link to={`${dex}/tokens/${token.address}`} className='font-semibold text-sm'> {token.symbol} </Link>
                </li>

            )
        }) : ['произошла ошибка']


    const searchPairs =getPairs ? getPairs
        .filter((pair)=>{
            return pair.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) || 
                    pair.token_one.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) ||
                    pair.token_two.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())})
        .map( (pair)=>{
            return (
                <li key={uniqid()} className=' bg-form hover:bg-fuchsia-500 hover:bg-opacity-30 cursor-pointer flex items-center my-3'>
                
                        <img className="-mr-1 z-10 rounded-full" src={pair.token_one.icon} alt="imgToken1" style={{width: 20, height: 20}}/>
                        <img className="mr-3 rounded-full" src={pair.token_two.icon} alt="imgToken2" style={{width: 20, height: 20}}/>
           
                    <Link to={`${dex}/pairs/${pair.address}`} className='font-semibold text-sm'>{pair.name}</Link>
                </li>

            )
        }) : (<li>ПРОИЗОШЛА ОШИБКА</li>)

    return (

        
    <form className='flex items-center  text-xs h-9 w-64 bg-form rounded border-inActive border text-text' action="" onSubmit={ (e)=>{e.preventDefault()} }>
        <div className='mx-3'>
            <SearchSvg/>
        </div>
        <input type="text"  value={valueInput} onChange={(e)=>{setValueInput(e.target.value); hiddenNav(e.target.value ? true : false)}} 
                className="h-8 ml-2 w-48 bg-form rounded outline-none" placeholder='Search pairs and tokens ...'/>
                <span onClick={(e)=>{setValueInput(''); hiddenNav(false)}} className={`${valueInput ? 'font-medium text-xl cursor-pointer p-1' : 'hidden'} `}><CloseInput/></span>
        { valueInput ? (
                    <ul className='bg-form mt-96 h-80 w-64 overflow-auto z-50 list-none absolute  rounded-2xl border-inActive border border-opacity-30 px-5'>
                    <div className='border-b border-b-inActive border-opacity-30 py-4'>
                        <div className='flex '>
                            <h2 className='text-base text-inActive font-semibold mb-1'>tokens</h2>
                        </div>
                        {searchInput.length >0 ? searchInput : 'нет токенов с таким именем'}
                    </div>
                    <div>
                        <h2 className='text-base text-inActive font-semibold py-1'>pairs</h2>
                        {searchPairs.length >0 ? searchPairs : 'нет пар с такими токенами'}
                    </div>
                </ul>
        ) : null
    }
    </form>  
    )
}

export const SearchInput = observer(SearchInputComponent)
