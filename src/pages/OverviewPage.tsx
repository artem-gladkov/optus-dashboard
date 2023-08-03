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
import Spinner from '../components/spinner/Spinner'
import Bg from '../components/background/bg'
import { useParams } from "react-router-dom"




const OverviewComponent = () => {
    

    const [errorTransaction, setErrorTransaction] = useState(false)
    const {pairsApi,overviewApi, getOverview, getPairs , getErrorOverview, activeButtonDex, updateOverview,updateHandlerButtonDexBo, dexListApi, getTransactions, getTrans } = store

    const {dex} = useParams()



    useEffect(()=>{
        dexListApi()
        updateHandlerButtonDexBo(true)
        updateOverview({})
        if(getErrorOverview) {setErrorTransaction(true)}
        if(!getErrorOverview) {setErrorTransaction(false)}
        overviewApi('1Y', dex || 'OPTUS')  
        updateHandlerButtonDexBo(true)
        getTransactions(dex || 'OPTUS')
        pairsApi(dex)
    }, [activeButtonDex])
    
    // console.log(toJS(getOverview))

    return (
   
        <div className='h-full py-14  relative bg-bg flex flex-col justify-center'>
            <Bg/>
            <div className='py-0 px-4 lg:px-14'>
                <div className='flex flex-col z-50 relative'>
                            <h1 className='font-bold text-3xl text-text'>Overview {activeButtonDex}</h1>
                            <div className=' flex  lg:flex mt-5 justify-center lg:flex-row flex-col'>
                                <div className='h-charts  w-full lg:w-1/2 pb-6 lg:mr-5 bg-form rounded-2xl justify-center items-center mb-14'>
                                
                                        {getOverview.liquidity_graph   ? (
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

                                <div className='h-charts  w-full lg:w-1/2 pb-6 lg:mr-5  bg-form  rounded-2xl justify-center items-center '>   
                                
                                        {getOverview.liquidity_graph   ? (
                                                <>
                                                { !getErrorOverview ? 
                                                    <ChartsOverview colors={{areaTopColor: '#7602eb', areaBottomColor: '#7602eb3c', lineColor: '#7602eb'}} 
                                                                    titleMarker={true} type={'Volume (24hrs)'} 
                                                                    data ={toJS(getOverview.volume_graph)} /> :  
                                                    
                                                                    <Spinner/>
                                                }  
                                                </>

                                        ) : (
                                            getErrorOverview  ? 'Произошла ошибка, но мы решаем эту проблему' : ( 
                                                <div className='w-full h-full flex justify-center  items-center'>
                                                    <Spinner/>
                                                </div>)
                                        )}
                                </div>
                            </div>

                            <div className='md:flex mt-5 mb-5 bg-form text-inActive p-6 rounded-2xl hidden'>
                                <div className="mr-4"> TON Price: <span className='text-text'>{getOverview.ton_price?.value} $ </span> </div>
                                <div className="mr-4">  Transaction (24H): <span className='text-text'>{getOverview.transactions_24h?.value}</span> </div>
                                <div className="mr-4">    Pairs: <span className='text-text'>{getOverview.pairs?.length}</span>  </div>
                                <div className="mr-4">  Fees (24H): <span className='text-text'>{getOverview.fees_24h?.value} $</span> </div>
                            </div>

                            {/* Топ монет */}
                            <div className='flex  flex-col mt-10 text-text'>
                                <div className='flex justify-between'>
                                <h1 className='font-medium text-2xl '>Top Jettons {activeButtonDex}</h1>
                                {/* <SearchInput getTokens={getTokens} getPairs={getPairs} /> */}
                                </div>

                                <Tokens typePage='overview'/>
                            </div>

                            {/* Топ пар */}

                            <div className='flex  flex-col mt-10 text-text'>
                                <h1 className='font-medium text-2xl '>Top Pairs {activeButtonDex}</h1>
                                <Pairs typePage='overview' data={getPairs}/>
                            </div>

                            {/* Транзакции */}

                            <div key={uniqid()} className='flex  flex-col mt-10 text-text'>
                                <h1 className='font-medium text-2xl '>Transactions {activeButtonDex}</h1>
                                <Transactions data = {getTrans} error = {errorTransaction}/>
                            </div>


                        </div>

                        <div className='h-20'>
                        
                        </div>  
            </div>

        </div>
   
        
    )
}

export const Overview = observer(OverviewComponent)