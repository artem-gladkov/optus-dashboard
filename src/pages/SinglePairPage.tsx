/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from "../Store/store"
import { toJS } from "mobx"
import { TokenForm } from "../components/tokenForm/TokenForm"
import { Transactions } from "../components/transactions/Transactions"
import { PairInformation } from "../components/PairInformation/PairInformation"
import FavouritesButton from "../components/favouritesButton/FavouritesButton"
import { SearchInput } from "../components/searchInput/SearchInput"
import { ChartsForm } from "../components/charts/ChartsPrice"
import { ChartsOverview } from "../components/charts/ChartsOverview"
import {ButtonsCharts} from "../components/buttonsGroupe/ButtonsCharts"
import Spinner from "../components/spinner/Spinner"
import Bg from '../components/background/bg'

interface Props {
    
}

const SinglePairPageComponent = (props: Props) => {
    const [typeButtonCharts, setTypeButtonCharts] = useState('Liquidity')
    const [errorTransaction, setErrorTransaction] = useState(false)
    const {getSinglePair, getPairSingleApi, getErrorSinglePair, updateHandlerButtonDexBo}  = store
    const [handleButtonCharts ,setHandleButtonCharts] = useState(false)
    const {dex, address} = useParams()    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1)


    const HandleChartsComponent = () => {
        if(toJS(getSinglePair.liquidity_graph)){
            if(typeButtonCharts === "Liquidity"){ 
                return ( <ChartsOverview colors={{areaTopColor: '#7602eb', areaBottomColor: '#7602eb3c', lineColor: '#7602eb'}} titleMarker={false} type={'Liquidity'} data ={toJS(getSinglePair.liquidity_graph)}/> ) }
            if(typeButtonCharts === "Volume"){         
                return ( <ChartsOverview colors={{areaTopColor: '#7602eb', areaBottomColor: '#7602eb3c', lineColor: '#7602eb'}} titleMarker={false} type={'Volume (24hrs)'} data ={toJS(getSinglePair.volume_graph)}/> ) }
            if(typeButtonCharts === `${getSinglePair.token_one.symbol}-${getSinglePair.token_two.symbol}`){ 
                return ( <ChartsForm  data ={toJS(getSinglePair.symbol_one_price_graph)}/> ) }
            if(typeButtonCharts === `${getSinglePair.token_two.symbol}-${getSinglePair.token_one.symbol}`){ 
                return ( <ChartsForm data ={toJS(getSinglePair.symbol_two_price_graph)}/> ) }
        }
        return <Spinner/>
    }

    useEffect(()=>{

        if(getErrorSinglePair) {setErrorTransaction(true)}
        if(!getErrorSinglePair) { setErrorTransaction(false)}
        getPairSingleApi(address, '1Y',dex)
        updateHandlerButtonDexBo(true)
    }, [address])

    console.log(toJS(getSinglePair))
  
    
    return ( 
        <>
            {getSinglePair.symbol_one_indicators ? 
                            ( getErrorSinglePair ? "Произошла ошибка, но мы уже решаем эту проблему" :  (
                                <div className="h-full py-14 bg-bg flex flex-col justify-center relative">
                                    <div className="h-full flex flex-col justify-center absolut mt-64">
                                        <Bg type={'single'}/>
                                    </div>
                                    <div className="flex w-full h-full flex-col text-text xl:px-28 z-50 -mt-64 absolut">
                                        <div className="flex justify-between w-full  flex-wrap  items-center my-5">
                                                <div className="flex">
                                                    <button onClick={goBack}>
                                                        <span>&lArr;</span> 
                                                        <span className="ml-2 font-medium">Back</span>
                                                    </button>
                                                    <span className="ml-6">{getSinglePair.token_one.symbol}-{getSinglePair.token_two.symbol}</span>

                                                </div>
                                                <div className="w-1/2">
                                                    {/* <SearchInput /> */}
                                                </div>
                                        </div>

                                            <div className="flex justify-between flex-col lg:flex-row mt-10">
                                              
                                                <div className="flex ld:text-3xl text-xl font-medium mb-4">
                                                    <div className="flex">
                                                        <div className="z-10"><img src={getSinglePair.token_one.icon} alt="iconToken" width={30} height={30}/></div>
                                                        <div className="-ml-4"><img src={getSinglePair.token_two.icon} alt="iconToken" width={30} height={30}/></div>
                                                    </div>
                                                        <div className="ml-4">
                                                            {getSinglePair.token_one.symbol}-{getSinglePair.token_two.symbol} <span>Pair</span> 
                                                        </div>
                                                    </div>
                                            
                                          
                                                <div>
                                                    <div className="flex flex-col lg:flex-row">
                                                    <div className="items-center bg-form rounded-lg px-3 py-1 hover:bg-opacity-40 mr-2 border border-inActive">
                                                        <Link to={`https://tonapi.io/account/${getSinglePair.token_one.address}` }
                                                            target="_blank"> 
                                                            <button > 
                                                                {`1 ${getSinglePair.token_one.symbol} =< ${getSinglePair.symbol_one_indicators.current_pair_price.value} ${getSinglePair.token_two.symbol} (${getSinglePair.symbol_two_indicators?.current_usd_price?.value} $)`}
                                                            </button>
                                                        </Link>    
                                                    </div>
                                                    <div className="items-center bg-form rounded-lg px-3 py-1 hover:bg-opacity-70 mr-2 border border-inActive">
                                                        <Link to={`https://tonapi.io/account/${getSinglePair.token_two.address}` }
                                                            target="_blank"> 
                                                            <button> 
                                                                {`1 ${getSinglePair.token_two.symbol} =< ${getSinglePair?.symbol_two_indicators?.current_pair_price?.value} ${getSinglePair.token_one.symbol} (${getSinglePair.symbol_one_indicators?.current_usd_price?.value} $)`}
                                                            </button>
                                                        </Link>    
                                                    </div>
                                                     </div>
                                                    {/* <FavouritesButton symbol={`${getSinglePair.token_one.symbol}@-${getSinglePair.token_two.symbol}`}
                                                                    address={getSinglePair.address}  /> */}

                                                                    {/* с помощью @ потом отличаем какой тип, пара или один токен */}
                                                </div>
                                            </div>



                                                    {/* статистика по паре */}

                                            <div className="flex flex-col mt-10 ">
                                                <div className="text-xl">Pair Stats</div>
                                                <div className="md:flex md:justify-between w-full mt-3 ">
                                                    {/* левая часть*/}

                                                    <div className="md:flex flex-col w-4/12 mr-2  rounded-3xl justify-between hidden">
                                                        <TokenForm title={'Liquidity'} value={getSinglePair.liquidity.value} change={getSinglePair.liquidity.change}/>
                                                        <TokenForm title={'Volume (24hrs)'} value={getSinglePair.volume_24h.value} change={getSinglePair.volume_24h.change}/>
                                                        <TokenForm title={'Fees (24hrs)'} value={getSinglePair.fees_24h.value} change={getSinglePair.fees_24h.change}/>
                                                        <div className="flex flex-col rounded-2xl p-4 mb-2 bg-form">
                                                            <div className='mb-3'>
                                                                <h3>Pooled Tokens</h3>
                                                            </div>
                                                            <div className="flex">
                                                                <div className="mb-3">
                                                                    <img src={getSinglePair.token_one.icon} alt="iconToken" width={24} height={24}/> 
                                                                </div>
                                                                <div className="ml-2"> <span>{getSinglePair.symbol_one_indicators.pool_quantity.value}</span> {getSinglePair.token_one.symbol}</div>
                                                            </div>
                                                            <div className="flex">
                                                                <div className="mb-3">
                                                                    <img src={getSinglePair.token_two.icon} alt="iconToken" width={24} height={24}/> 
                                                                </div>
                                                                <div className="ml-2"> <span>{getSinglePair.symbol_two_indicators.pool_quantity.value}</span> {getSinglePair.token_two.symbol}</div>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                    <div className="bg-form flex flex-col md:w-8/12 rounded-2xl mb-2 text-text">
                                                        <div className="h-1/12 w-1/3 flex flex-col p-2 justify-between">
                                                            <button className="md:hidden flex border items-center justify-around rounded-md" onClick={()=>setHandleButtonCharts((v)=>!v)}>             {typeButtonCharts}<div className="rotate-90 text-2xl">&#8250;</div>
                                                            </button>
                                                            <div className="hidden md:block">
                                                                    <ButtonsCharts namePairsOne={getSinglePair.token_one.symbol} 
                                                                        namePairsTwo={getSinglePair.token_two.symbol} 
                                                                        isPairs={true} 
                                                                        typeButtonCharts={typeButtonCharts} 
                                                                        setTypeButtonCharts={setTypeButtonCharts}/>
                                                            </div>
                                                                {handleButtonCharts ? (
                                                                    <div className="absolute flex z-50 mt-7 bg-form flex-end md:hidden">
                                                                    <ButtonsCharts namePairsOne={getSinglePair.token_one.symbol} 
                                                                        namePairsTwo={getSinglePair.token_two.symbol} 
                                                                        isPairs={true} 
                                                                        typeButtonCharts={typeButtonCharts} 
                                                                        setTypeButtonCharts={setTypeButtonCharts}/>
                                                                    </div>

                                                                ) : (null)}

                                                            

                                                        </div>
                                                        <div className="h-80 md:h-full w-full text-text">
                                                            <HandleChartsComponent/>
                                                        </div>                    
                                                    </div>
                                                </div>
                                            </div>

                                                {/* Транзакции */}

                                            <div className="flex flex-col mt-5">
                                                <h2 className="text-2xl font-normal">Transaction</h2>   
                                                <Transactions data={getSinglePair.transactions} error={errorTransaction}/>
                                            </div>  

                                                {/* Pair Information */}

                                            <div className="flex flex-col mt-5">
                                                <h2 className="text-2xl font-normal">Pair Information</h2>
                                                <PairInformation pairname={`${getSinglePair.token_one.symbol} - ${getSinglePair.token_two.symbol}`}
                                                                    pairAddress={getSinglePair.address}
                                                                    tokenOneAddress={getSinglePair.token_one.address}
                                                                    tokenTwoAddress={getSinglePair.token_two.address}
                                                                    tokenOneSymbol={getSinglePair.token_one.symbol}
                                                                    tokenTwoSymbol={getSinglePair.token_two.symbol}/>    
                                            </div>  

                                            <div className="flex w-full h-10 m-10">
                                                    
                                            </div>

                                    </div>
                                </div>

                                )
                            ) : ( getErrorSinglePair ? "Произошла ошибка, но мы уже решаем эту проблему" : <Spinner/>)
            }
        </>

    )
}

export const  SinglePairPage = observer(SinglePairPageComponent)
