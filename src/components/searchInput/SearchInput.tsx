import { useState } from 'react'
import { Link } from 'react-router-dom';
import uniqid from 'uniqid'
import { observer } from 'mobx-react';
import { store } from '../../Store/store';

interface Props {
   getPairs?: any;
   getTokens?: any
}

const SearchInputComponent = ({getTokens= store.getTokens, getPairs= store.getPairs}: Props) => {

    const [valueInput, setValueInput] = useState('')


    const searchInput = getTokens
        .filter((token)=>{return token.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) || token.symbol.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())  })
        .map( (token)=>{
            return (
                <li key={uniqid()} className='p-2 pl-10  hover:bg-fuchsia-500 hover:bg-opacity-30 cursor-pointer '>
                    <Link to={`/tokens/${token.address}`} className=''> {token.symbol} &gt;&gt;&gt;  {token.name}</Link>
                </li>

            )
        })


    const searchPairs = getPairs
        .filter((pair)=>{
            return pair.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) || 
                    pair.token_one.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()) ||
                    pair.token_two.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())})
        .map( (pair)=>{
            return (
                <li key={uniqid()} className='p-2 pl-10  hover:bg-fuchsia-500 hover:bg-opacity-30 cursor-pointer '>
                    <Link to={`/pairs/${pair.address}`} className=''>{pair.name} &gt;&gt;&gt; {pair.token_one.name} - {pair.token_two.name}</Link>
                </li>

            )
        })

    return (

        
    <form className='w-full relative' action="">
        <input type="text" value={valueInput} onChange={(e)=>{setValueInput(e.target.value)}} className="inputSearch h-10 mt-7 w-full" placeholder='Search pairs and tokens ...'/>
        { valueInput ? (
                    <ul className='overflow-auto h-auto max-h-60 z-50 list-none absolute w-full rounded-2xl bg-cyan-300'>
                    <div>
                        <h2 className='text-lg pl-2'>Tokens:</h2>
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
