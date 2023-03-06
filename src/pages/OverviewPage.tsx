/* eslint-disable react-hooks/exhaustive-deps */
import { Tokens } from '../components/tokens/Tokens'
import { observer } from "mobx-react-lite"
import { Pairs } from '../components/pairs/Pairs'
import { store } from '../Store/store'
import { useEffect, useState } from "react"
import {toJS} from "mobx"
import { Transactions } from '../components/transactions/Transactions'
import uniqid from 'uniqid'
import { ChartsOverview } from '../components/charts/ChartsOverview'
import {SearchInput} from '../components/searchInput/SearchInput'
import Spinner from '../components/spinner/Spinner'

interface Props {
    
}

const OverviewComponent = (props: Props) => {
    

    const [errorTransaction, setErrorTransaction] = useState(false)
    const {overviewApi, getOverview, getPairs, getTokens , getErrorOverview } = store

    useEffect(()=>{
        if(getErrorOverview) {setErrorTransaction(true)}
        if(!getErrorOverview) { setErrorTransaction(false)}
        overviewApi('1Y')  
    }, [])

    console.log('render2')
    
    return (
    <>
    <div className='h-full'>
        <div className='flex flex-col'>
            <h1 className='font-bold text-3xl'>Analytics</h1>

              <SearchInput getTokens={getTokens} getPairs={getPairs} />


            <div className='flex mt-5 mb-5'>
                <div className="mr-4"> TON Price: <span>{getOverview.ton_price?.value}</span>$  </div>
                <div className="mr-4">  Transaction (24H): <span>{getOverview.transactions_24h?.value}</span> </div>
                <div className="mr-4">    Pairs: <span>{getOverview.pairs?.length}</span>  </div>
                <div className="mr-4">  Fees (24H): <span>{getOverview.fees_24h?.value}</span>$ </div>
             </div>

            {/* Графики */}
            <div className='flex mt-5'>
                <div className='h-charts pb-6 w-1/2 mr-2 bg-green-200 bg-opacity-20 rounded-2xl justify-center items-center'>
                   
                        {getOverview.liquidity_graph && getOverview.volume_graph ? (
                                <>
                                 { !getErrorOverview ? <ChartsOverview titleMarker={true} type={'Liquidity'} data ={toJS(getOverview.liquidity_graph)} /> :  'Произошла ошибка, но мы решаем эту проблему'}  
                                </>

                        ) : (
                            getErrorOverview ? 'Произошла ошибка, но мы решаем эту проблему' : ( 
                                <div className='w-full h-full flex justify-center  items-center'>
                                     <Spinner/>
                                </div>)
                        )}
                </div>

                <div className='h-charts pb-6  w-1/2 bg-green-200 bg-opacity-20 rounded-2xl justify-center items-center'>   
                
                        {getOverview.liquidity_graph && getOverview.volume_graph ? (
                                <>
                                 { !getErrorOverview ? 
                                 <ChartsOverview titleMarker={true} type={'Volume (24hrs)'} data ={toJS(getOverview.volume_graph)} />:  'Произошла ошибка, но мы решаем эту проблему'}  
                                </>

                        ) : (
                            getErrorOverview ? 'Произошла ошибка, но мы решаем эту проблему' : ( 
                                <div className='w-full h-full flex justify-center  items-center'>
                                     <Spinner/>
                                </div>)
                        )}
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
                <Pairs data={getPairs}/>
            </div>

            {/* Транзакции */}

            <div key={uniqid()} className='flex  flex-col mt-10'>
                <h1 className='font-medium text-2xl '>Transactions</h1>
                <Transactions data = {getOverview.transactions} error = {errorTransaction}/>
            </div>


        </div>
        <div className='h-20'>
        
        </div>  
</div></>
        
    )
}

export const Overview = observer(OverviewComponent)