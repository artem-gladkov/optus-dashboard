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
import FavouritesButton from "../components/favouritesButton/FavouritesButton"
import { ChartsForm } from "../components/charts/ChartsPrice"
import { ChartsOverview } from "../components/charts/ChartsOverview"
import { SearchInput } from "../components/searchInput/SearchInput"
import {ButtonsCharts} from "../components/buttonsGroupe/ButtonsCharts"
import { numberColor } from "../function/colorChanges"
import Spinner from "../components/spinner/Spinner"

const SingleTokenPageComponent=(props: any) => {

    const [typeButtonCharts, setTypeButtonCharts] = useState('Liquidity')
    const [errorTransaction, setErrorTransaction] = useState(false)
    const {getSingleToken, getTokenSingleApi, getErrorSingleToken}  = store
    const {address} = useParams()    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1)
    const HandleChartsComponent = () => {
        if(getSingleToken.liquidity_graph){
            if(typeButtonCharts === "Liquidity"){ 
                return ( <ChartsOverview titleMarker={false} type={'Liquidity'} data ={toJS(getSingleToken.liquidity_graph)}/> ) }
            if(typeButtonCharts === "Volume"){         
                return ( <ChartsOverview  titleMarker={false} type={'Volume (24hrs)'} data ={toJS(getSingleToken.volume_graph)}/> ) }
            if(typeButtonCharts === "Price"){ 
                return ( <ChartsForm data={toJS(getSingleToken.usd_price_graph)}/> ) }
        }

        return <Spinner/>
    }
  

    useEffect(()=>{
        if(getErrorSingleToken) {setErrorTransaction(true)}
        if(!getErrorSingleToken) { setErrorTransaction(false)}
        getTokenSingleApi(address, '1Y')
    }, [address])
 

    return (
        <>
            {getSingleToken.address ? ( getErrorSingleToken ? "Произошла ошибка, но мы уже решаем эту проблему" : (

                <div className="flex w-full h-full flex-col">
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
                                <SearchInput />
                            </div>
                    </div>
                    <div className="flex justify-between items-end mt-10">
                        <div className="flex items-end ">
                           <div><img src={getSingleToken.icon} alt="" width={40}/></div> 
                           <div className="text-3xl ml-2">{getSingleToken.name}</div>
                           <div className="text-3xl ml-2">({getSingleToken.symbol})</div>
                           <div className="text-xl ml-2">{getSingleToken.current_usd_price.value}$</div>
                           <div className= {`${numberColor(getSingleToken.current_usd_price.change)} ml-2 font-bold`}>{getSingleToken.current_usd_price.change} %</div>                         
                        </div>
                        <div>
                            <FavouritesButton symbol={getSingleToken.symbol} address={getSingleToken.address}/>
                        </div>
                    </div>

                            {/* статистика по монете */}

                    <div className="flex flex-col mt-10">
                        <div className="text-xl">Token Stats</div>
                        <div className="flex justify-between mt-3">
                              {/* левая часть*/}

                            <div className="flex flex-col w-4/12 mr-2">
                                <TokenForm title={'Liquidity'} value={getSingleToken.liquidity.value} change={getSingleToken.liquidity.change}/>
                                <TokenForm title={'Volume (24hrs)'} value={getSingleToken.volume_24h.value} change={getSingleToken.volume_24h.change}/>
                                <TokenForm title={'Transactions (24hrs)'} value={getSingleToken.transactions_24h.value} change={getSingleToken.transactions_24h.change} transaction={true}/>
                            </div>
                            <div className="flex flex-col w-8/12 bg-green-200 bg-opacity-20 rounded-2xl mb-2 ">
                                <div className="h-1/12 w-1/3 flex bg-transparent p-2 justify-between">
                                    <ButtonsCharts isPairs={false} typeButtonCharts={typeButtonCharts} setTypeButtonCharts={setTypeButtonCharts}/>
                                </div>
                                <div className="h-full">
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
                        <h2 className="text-2xl font-normal">Token Iformation</h2>
                        <TokenInformation symbol = {getSingleToken.symbol} name ={getSingleToken.name} address = {getSingleToken.address}/>    
                    </div>  

                    <div className="flex w-full h-10 m-10">
                            
                    </div>
                </div>)

            ) : ( getErrorSingleToken ? "Произошла ошибка, но мы уже решаем эту проблему" : <Spinner/>)
        
        
        }
        </>

    )
}


export const SingleTokenPage = observer(SingleTokenPageComponent)