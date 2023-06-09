import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import uniqid from 'uniqid'
import { observer } from 'mobx-react';
import { store } from '../../Store/store';
import  SearchSvg from '../svg/search'

interface Props {
   getPairs?: any
   getTokens?: any
}

const SearchInputComponent = ({getTokens = store.getTokens, getPairs = store.getPairs}: Props) => {
    const {dex} = useParams()
    const [valueInput, setValueInput] = useState('')
    const searchInput = getTokens ? getTokens
        .filter((token)=>{return token.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) || token.symbol.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())  })
        .map( (token)=>{
            return (
                <li key={uniqid()} className='pl-10  bg-headerActiveBTN hover:bg-opacity-30 cursor-pointer '>
                    <Link to={`${dex}/tokens/${token.address}`} className=''> {token.symbol} </Link>
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
                <li key={uniqid()} className=' pl-10 bg-headerActiveBTN hover:bg-fuchsia-500 hover:bg-opacity-30 cursor-pointer '>
                    <Link to={`${dex}/pairs/${pair.address}`} className=''>{pair.name}</Link>
                </li>

            )
        }) : (<li>ПРОИЗОШЛА ОШИБКА</li>)

    return (

        
    <form className='flex items-center justify-end text-xs h-9 w-56 bg-form rounded border-inActive border text-text' action="">
        <SearchSvg/>
        <input type="text"  value={valueInput} onChange={(e)=>{setValueInput(e.target.value)}} 
                className="h-8 ml-2 w-48 bg-form rounded outline-none" placeholder='Search pairs and tokens ...'/>
                <span onClick={(e)=>{setValueInput('')}} className='font-medium text-xl cursor-pointer'>x</span>
        { valueInput ? (
                    <ul className='bg-headerActiveBTN mt-52 h-40 w-56 overflow-auto z-50 list-none absolute  rounded-2xl '>
                    <div>
                        <div className='flex'>
                            <h2 className='text-lg pl-2'>Tokens:</h2>

                        </div>

                        
                        {searchInput.length >0 ? searchInput : 'нет токенов с таким именем'}
                    </div>
                    <div >
                        <h2 className='text-lg pl-2'>Pairs:</h2>
                        {searchPairs.length >0 ? searchPairs : 'нет пар с такими токенами'}
                    </div>
                </ul>
        ) : null
    }
    </form>  
    )
}

export const SearchInput = observer(SearchInputComponent)
