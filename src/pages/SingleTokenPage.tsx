/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from "../Store/store"
import { toJS } from "mobx"
import { TokenForm } from "../components/tokenForm/TokenForm"
import { Pairs } from "../components/pairs/Pairs"
import { Transactions } from "../components/transactions/Transactions"
import { TokenInformation } from "../components/tokenInformation/TokenInformation"
import { ChartsForm } from "../components/charts/ChartsPrice"
import { ChartsOverview } from "../components/charts/ChartsOverview"
import {ButtonsCharts} from "../components/buttonsGroupe/ButtonsCharts"
import { numberColor } from "../function/colorChanges"
import Spinner from "../components/spinner/Spinner"
import Bg from "../components/background/bg"

const SingleTokenPageComponent=(props: any) => {

    const [typeButtonCharts, setTypeButtonCharts] = useState('Liquidity')
    const [errorTransaction, setErrorTransaction] = useState(false)
    const {getSingleToken, getTokenSingleApi, getErrorSingleToken, updateHandlerButtonDexBo}  = store
    const {dex,address} = useParams()    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1)
    const HandleChartsComponent = () => {
        if(getSingleToken.liquidity_graph){
            if(typeButtonCharts === "Liquidity"){ 
                return ( <ChartsOverview colors={{areaTopColor: '#7602eb', areaBottomColor: '#7602eb3c', lineColor: '#7602eb', backgroundColor: '#161223'}} titleMarker={false} type={'Liquidity'} data ={toJS(getSingleToken.liquidity_graph)}/> ) }
            if(typeButtonCharts === "Volume"){         
                return ( <ChartsOverview colors={{areaTopColor: '#7602eb', areaBottomColor: '#7602eb3c', lineColor: '#7602eb'}}  titleMarker={false} type={'Volume (24hrs)'} data ={toJS(getSingleToken.volume_graph)}/> ) }
            if(typeButtonCharts === "Price"){ 
                return ( <ChartsForm data={toJS(getSingleToken.usd_price_graph)}/> ) }
        }

        return <Spinner/>
    }
  

    useEffect(()=>{
        if(getErrorSingleToken) {setErrorTransaction(true)}
        if(!getErrorSingleToken) { setErrorTransaction(false)}
        getTokenSingleApi(address, '1Y', dex)
        updateHandlerButtonDexBo(true)
    }, [address])
    


    return (
        <>
            {getSingleToken.address ? ( getErrorSingleToken ? "Произошла ошибка, но мы уже решаем эту проблему" : (
                <div className="h-full py-14 bg-bg flex flex-col justify-center relative">
                     <div className="h-full flex flex-col justify-center absolut mt-40">
                                <Bg type={'single'}/>
                        </div>
                    <div className="flex w-full h-full flex-col text-text lg:px-28 px-4 z-50 -mt-36">
                    <div className="flex justify-between w-full  flex-wrap  items-center my-5">
                            <div className="flex">
                                <button onClick={goBack}>
                                    <span>&lArr;</span> 
                                    <span className="ml-2 font-medium">Back</span>
                                </button>
                                <span className="ml-6">{getSingleToken.symbol}
                                    <span className="ml-2">&#8250;</span>
                                </span>
                                <Link to={`https://tonapi.io/account/${getSingleToken.address}`} className="ml-1 w-28" target="_blank" >
                                    ({getSingleToken.address.slice(0,6)}...{getSingleToken.address.slice(-6)})
                                </Link> 
                            </div>
                            <div className="w-1/2">
                                {/* <SearchInput /> */}
                            </div>
                    </div>
                    <div className="flex justify-between items-end mt-10">
                        <div className="flex items-end ">
                           <div><img src={getSingleToken.icon} alt="" width={30} className="rounded-full"/></div> 
                           <div className="lg:text-3xl text-xl ml-2 hidden md:block">{getSingleToken.name}</div>
                           <div className="lg:text-3xl text-xl ml-2">({getSingleToken.symbol})</div>
                           <div className="lg:text-xl text-base ml-2">{getSingleToken.current_usd_price.value}$</div>
                           <div className= {`${numberColor(getSingleToken.current_usd_price.change)} ml-2 font-bold`}>{getSingleToken.current_usd_price.change} %</div>                         
                        </div>
                        <div>
                            {/* <FavouritesButton symbol={getSingleToken.symbol} address={getSingleToken.address}/> */}
                        </div>
                    </div>

                            {/* статистика по монете */}

                    <div className="flex flex-col mt-10">
                        <div className="text-xl">Token Stats</div>
                        <div className="md:flex md:justify-between w-full mt-3 ">
                              {/* левая часть*/}

                            <div className="md:flex flex-col w-4/12 mr-2  rounded-3xl justify-between hidden">
                                <TokenForm title={'Liquidity'} value={getSingleToken.liquidity.value} change={getSingleToken.liquidity.change}/>
                                <TokenForm title={'Volume (24hrs)'} value={getSingleToken.volume_24h.value} change={getSingleToken.volume_24h.change}/>
                                <TokenForm title={'Transactions (24hrs)'} value={getSingleToken.transactions_24h.value} change={getSingleToken.transactions_24h.change} transaction={true}/>
                            </div>
                            <div className="flex flex-col md:w-8/12 bg-form  rounded-2xl mb-2 w-full">
                                <div className="h-1/12 w-1/3 flex p-2 justify-between">
                                    <ButtonsCharts isPairs={false} typeButtonCharts={typeButtonCharts} setTypeButtonCharts={setTypeButtonCharts}/>
                                </div>
                                <div className="h-80 md:h-full w-full text-text">
                                    <HandleChartsComponent/>
                                </div>                    
                            </div>
                        </div>
                    </div>

                        {/* Top PAIRS */}

                    <div className="flex flex-col mt-5">
                        <h2 className="text-2xl font-normal">Top Pairs</h2>
                        <Pairs data={getSingleToken.pairs}/>    
                    </div>  

                        {/* Транзакции */}

                        
                    <div className="flex flex-col mt-5">
                        <h2 className="text-2xl font-normal">Transactions</h2>
                        <Transactions data = {getSingleToken.transactions} address={address} error ={errorTransaction}/>    
                    </div>  

                        {/* Token Information */}
                    
                    <div className="flex flex-col mt-5">
                        <h2 className="text-2xl font-normal">Token Information</h2>
                        <TokenInformation symbol = {getSingleToken.symbol} name ={getSingleToken.name} address = {getSingleToken.address}/>    
                    </div>  
                </div>
                </div>
)

            ) : ( getErrorSingleToken ? "Произошла ошибка, но мы уже решаем эту проблему" : <div className="flex w-full h-full justify-center items-center mt-20"><Spinner/></div>)
        
        
        }
        </>

    )
}


export const SingleTokenPage = observer(SingleTokenPageComponent)