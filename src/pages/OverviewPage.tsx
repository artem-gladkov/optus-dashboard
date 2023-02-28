/* eslint-disable react-hooks/exhaustive-deps */
import { Tokens } from '../components/tokens/Tokens'
import { observer } from "mobx-react-lite"
import { Pairs } from '../components/pairs/Pairs'
import { store } from '../Store/store'
import { useEffect, useState } from "react"
import {toJS} from "mobx"
import { Transactions } from '../components/transactions/Transactions'
import uniqid from 'uniqid'
import Char from './Char'
import { ChartsOverview } from '../components/charts/ChartsOverview'
import { Link } from 'react-router-dom'
import {SearchInput} from '../components/searchInput/SearchInput'

interface Props {
    
}

const OverviewComponent = (props: Props) => {



    const {overviewApi, getOverview, getPairs, getTokens } = store

    useEffect(()=>{
        store.pairsApi()
        overviewApi('day')
        console.log('render1')

    }, [])

    console.log(toJS(getTokens), toJS(getPairs))


    console.log('render2')
    
    return (
    <>
    <div className='h-full'>
        <div className='flex flex-col'>
            <h1 className='font-bold text-3xl'>Analytics</h1>

              <SearchInput getTokens={getTokens} getPairs={getPairs} />


            <div className='flex mt-5 mb-5'>
            <div className="mr-4"> ETH Price: <span>1504</span>$  </div>
            <div className="mr-4">  Transaction (24H): <span>92,996</span> </div>
            <div className="mr-4">    Pairs: <span>145,887</span>  </div>
            <div className="mr-4">  Fees (24H): <span>470 277</span>$ </div>
        </div>

            {/* Графики */}
            <div className='flex mt-5'>
                <div className='h-charts pb-6 w-1/2 mr-2 bg-green-200 bg-opacity-20 rounded-2xl'>
                    <>
                        {getOverview.liquidity_graph && (
                              <ChartsOverview titleMarker={true} type={'Liquidity'} data ={toJS(getOverview.liquidity_graph)} />
                        )}
                    </>

                </div>

                <div className='h-charts pb-6  w-1/2 bg-green-200 bg-opacity-20 rounded-2xl'>
                <>
                        {getOverview.liquidity_graph && (
                              <ChartsOverview titleMarker={true} type={'Volume (24hrs)'} data ={toJS(getOverview.volume_graph)} />
                        )}
                    </>
                </div>
            </div>

            {/* Топ монет */}
            <div className='flex  flex-col mt-10'>
                <h1 className='font-medium text-2xl '>Top Tokens</h1>
                <Tokens/>
            </div>

            {/* Топ пар */}

            <div className='flex  flex-col mt-10'>
                <h1 className='font-medium text-2xl '>Top Pairs</h1>
                <Pairs data = {getPairs}/>
            </div>

            {/* Транзакции */}

            <div key={uniqid()} className='flex  flex-col mt-10'>
                <h1 className='font-medium text-2xl '>Transactions</h1>
                <Transactions data = {getOverview.transactions}/>
            </div>


        </div>
        <div className='h-20'>
        
        </div>  
</div></>
        
    )
}

export const Overview = observer(OverviewComponent)