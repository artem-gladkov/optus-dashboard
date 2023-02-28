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
import { ChartsForm } from "../components/charts/ChartsForm"
import { ChartsOverview } from "../components/charts/ChartsOverview"
import { SearchInput } from "../components/searchInput/SearchInput"
import {ButtonsCharts} from "../components/buttonsGroupe/ButtonsCharts"

const SingleTokenPageComponent=(props: any) => {

    const [typeButtonCharts, setTypeButtonCharts] = useState('Liquidity')

    const {getSingleToken, getTokenSingleApi}  = store
    const {address} = useParams()    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1)



    const initialData = [
        { time: "2018-03-28", value: 21.00 },
        { time: "2018-03-29", value: 20.80 },
        { time: "2018-03-30", value: 19.40 },
        { time: "2018-04-02", value: 18.75 },
        { time: "2018-04-03", value: 18.75 },
        { time: "2018-04-04", value: 18.95 },
        { time: "2018-04-05", value: 16.95 },
        { time: "2018-04-06", value: 17.70 },
        { time: "2018-04-09", value: 31.00 },
        { time: "2018-04-10", value: 30.20 },
        { time: "2018-04-11", value: 31.50 },
        { time: "2018-04-12", value: 27.95 },
        { time: "2018-04-13", value: 30.15 },
        { time: "2018-04-16", value: 29.60 },
        { time: "2018-04-17", value: 27.70 },
        { time: "2018-04-18", value: 21.45 },
        { time: "2018-04-19", value: 24.05 },
        { time: "2018-04-20", value: 25.60 },
        { time: "2018-04-23", value: 26.50 },
        { time: "2018-04-24", value: 28.40 },
        { time: "2018-04-25", value: 30.55 },
        { time: "2018-04-26", value: 29.40 },
        { time: "2018-04-27", value: 30.70 },
        { time: "2018-04-30", value: 31.00 },
        { time: "2018-05-02", value: 27.70 },
        { time: "2018-05-03", value: 30.80 },
        { time: "2018-05-04", value: 33.35 },
        { time: "2018-05-07", value: 33.10 },
        { time: "2018-05-08", value: 34.60 },
        { time: "2018-05-10", value: 35.20 },
        { time: "2018-05-11", value: 37.50 },
        { time: "2018-05-14", value: 38.85 },
        { time: "2018-05-15", value: 37.00 },
        { time: "2018-05-16", value: 37.05 },
        { time: "2018-05-17", value: 37.05 },
        { time: "2018-05-18", value: 38.25 },
        { time: "2018-05-21", value: 38.80 },
        { time: "2018-05-22", value: 40.00 },
        { time: "2018-05-23", value: 42.45 },
        { time: "2018-05-24", value: 42.30 },
        { time: "2018-05-25", value: 42.80 },
        { time: "2018-05-28", value: 43.45 },
        { time: "2018-05-29", value: 43.15 },
        { time: "2018-05-30", value: 35.15 },
        { time: "2018-05-31", value: 34.20 },
        { time: "2018-06-01", value: 35.35 },
        { time: "2018-06-04", value: 37.90 },
        { time: "2018-06-05", value: 35.75 },
        { time: "2018-06-06", value: 33.70 },
        { time: "2018-06-07", value: 30.00 },
        { time: "2018-06-08", value: 31.10 },
        { time: "2018-06-11", value: 32.30 },
        { time: "2018-06-13", value: 30.95 },
        { time: "2018-06-14", value: 31.45 },
        { time: "2018-06-15", value: 34.50 },
        { time: "2018-06-18", value: 35.35 },
        { time: "2018-06-19", value: 37.00 },
        { time: "2018-06-20", value: 34.00 },
        { time: "2018-06-21", value: 34.45 },
        { time: "2018-06-22", value: 34.45 },
        { time: "2018-06-25", value: 34.25 },
        { time: "2018-06-26", value: 34.35 },
        { time: "2018-06-27", value: 33.85 },
        { time: "2018-06-28", value: 35.20 },
        { time: "2018-06-29", value: 35.20 },
        { time: "2018-07-02", value: 34.85 },
        { time: "2018-07-03", value: 31.95 },
        { time: "2018-07-04", value: 35.00 },
        { time: "2018-07-05", value: 45.80 },
        { time: "2018-07-06", value: 45.45 },
        { time: "2018-07-09", value: 46.70 },
        { time: "2018-07-10", value: 48.45 },
        { time: "2018-07-11", value: 50.70 },
        { time: "2018-07-12", value: 50.20 },
        { time: "2018-07-13", value: 51.75 },
        { time: "2018-07-16", value: 52.00 },
        { time: "2018-07-17", value: 50.75 },
        { time: "2018-07-18", value: 52.00 },
        { time: "2018-07-19", value: 54.00 },
        { time: "2018-07-20", value: 53.55 },
        { time: "2018-07-23", value: 51.20 },
        { time: "2018-07-24", value: 52.85 },
        { time: "2018-07-25", value: 53.70 },
        { time: "2018-07-26", value: 52.30 },
        { time: "2018-07-27", value: 52.80 },
        { time: "2018-07-30", value: 53.30 },
        { time: "2018-07-31", value: 52.05 },
        { time: "2018-08-01", value: 54.00 },
        { time: "2018-08-02", value: 59.00 },
        { time: "2018-08-03", value: 56.90 },
        { time: "2018-08-06", value: 60.70 },
        { time: "2018-08-07", value: 60.75 },
        { time: "2018-08-08", value: 63.15 },
        { time: "2018-08-09", value: 65.30 },
        { time: "2018-08-10", value: 70.00 },
        { time: "2018-08-13", value: 69.25 },
        { time: "2018-08-14", value: 67.75 },
        { time: "2018-08-15", value: 67.60 },
        { time: "2018-08-16", value: 64.50 },
        { time: "2018-08-17", value: 66.00 },
        { time: "2018-08-20", value: 66.05 },
        { time: "2018-08-21", value: 66.65 },
        { time: "2018-08-22", value: 66.40 },
        { time: "2018-08-23", value: 69.35 },
        { time: "2018-08-24", value: 70.55 },
        { time: "2018-08-27", value: 68.80 },
        { time: "2018-08-28", value: 68.45 },
        { time: "2018-08-29", value: 63.20 },
        { time: "2018-08-30", value: 59.50 },
        { time: "2018-08-31", value: 59.50 },
        { time: "2018-09-03", value: 60.45 },
        { time: "2018-09-04", value: 62.25 },
        { time: "2018-09-05", value: 63.50 },
        { time: "2018-09-06", value: 66.90 },
        { time: "2018-09-07", value: 66.45 },
        { time: "2018-09-10", value: 68.50 },
        { time: "2018-09-11", value: 69.90 },
        { time: "2018-09-12", value: 67.80 },
        { time: "2018-09-13", value: 67.90 },
        { time: "2018-09-14", value: 69.25 },
        { time: "2018-09-17", value: 68.95 },
        { time: "2018-09-18", value: 65.85 },
        { time: "2018-09-19", value: 63.60 },
        { time: "2018-09-20", value: 64.00 },
        { time: "2018-09-21", value: 64.00 },
        { time: "2018-09-24", value: 66.05 },
        { time: "2018-09-25", value: 68.35 },
        { time: "2018-09-26", value: 68.30 },
        { time: "2018-09-27", value: 67.95 },
        { time: "2018-09-28", value: 68.45 },
        { time: "2018-10-01", value: 68.80 },
        { time: "2018-10-02", value: 68.60 },
        { time: "2018-10-03", value: 67.90 },
        { time: "2018-10-04", value: 68.60 },
        { time: "2018-10-05", value: 70.35 },
        { time: "2018-10-08", value: 72.35 },
        { time: "2018-10-09", value: 72.90 },
        { time: "2018-10-10", value: 72.85 },
        { time: "2018-10-11", value: 74.10 },
        { time: "2018-10-12", value: 73.00 },
        { time: "2018-10-15", value: 74.85 },
        { time: "2018-10-16", value: 76.00 },
        { time: "2018-10-17", value: 77.00 },
        { time: "2018-10-18", value: 79.00 },
        { time: "2018-10-19", value: 79.50 },
        { time: "2018-10-22", value: 82.60 },
        { time: "2018-10-23", value: 82.70 },
        { time: "2018-10-24", value: 82.10 },
        { time: "2018-10-25", value: 83.15 },
        { time: "2018-10-26", value: 83.40 },
        { time: "2018-10-29", value: 80.95 },
        { time: "2018-10-30", value: 76.75 },
        { time: "2018-10-31", value: 77.75 },
        { time: "2018-11-01", value: 78.12 },
        { time: "2018-11-02", value: 73.22 },
        { time: "2018-11-06", value: 72.60 },
        { time: "2018-11-07", value: 74.40 },
        { time: "2018-11-08", value: 76.50 },
        { time: "2018-11-09", value: 79.86 },
        { time: "2018-11-12", value: 78.10 },
        { time: "2018-11-13", value: 77.60 },
        { time: "2018-11-14", value: 71.70 },
        { time: "2018-11-15", value: 72.26 },
        { time: "2018-11-16", value: 73.80 },
        { time: "2018-11-19", value: 76.28 },
        { time: "2018-11-20", value: 72.80 },
        { time: "2018-11-21", value: 66.20 },
        { time: "2018-11-22", value: 65.10 },
        { time: "2018-11-23", value: 61.26 },
        { time: "2018-11-26", value: 64.10 },
        { time: "2018-11-27", value: 61.72 },
        { time: "2018-11-28", value: 61.40 },
        { time: "2018-11-29", value: 61.86 },
        { time: "2018-11-30", value: 60.60 },
        { time: "2018-12-03", value: 63.16 },
        { time: "2018-12-04", value: 68.30 },
        { time: "2018-12-05", value: 67.20 },
        { time: "2018-12-06", value: 68.56 },
        { time: "2018-12-07", value: 71.30 },
        { time: "2018-12-10", value: 73.98 },
        { time: "2018-12-11", value: 72.28 },
        { time: "2018-12-12", value: 73.20 },
        { time: "2018-12-13", value: 73.00 },
        { time: "2018-12-14", value: 72.90 },
        { time: "2018-12-17", value: 73.96 },
        { time: "2018-12-18", value: 73.40 },
        { time: "2018-12-19", value: 73.00 },
        { time: "2018-12-20", value: 72.98 },
        { time: "2018-12-21", value: 72.80 },
        { time: "2018-12-24", value: 72.90 },
        { time: "2018-12-25", value: 74.20 },
        { time: "2018-12-26", value: 73.98 },
        { time: "2018-12-27", value: 74.50 },
        { time: "2018-12-28", value: 74.00 },
        { time: "2019-01-03", value: 73.50 },
        { time: "2019-01-04", value: 73.90 },
        { time: "2019-01-08", value: 73.90 },
        { time: "2019-01-09", value: 72.94 },
        { time: "2019-01-10", value: 69.86 },
        { time: "2019-01-11", value: 70.34 },
        { time: "2019-01-14", value: 68.78 },
        { time: "2019-01-15", value: 68.02 },
        { time: "2019-01-16", value: 66.60 },
        { time: "2019-01-17", value: 65.94 },
        { time: "2019-01-18", value: 68.00 },
        { time: "2019-01-21", value: 69.20 },
        { time: "2019-01-22", value: 69.76 },
        { time: "2019-01-23", value: 69.60 },
        { time: "2019-01-24", value: 69.62 },
        { time: "2019-01-25", value: 69.30 },
        { time: "2019-01-28", value: 69.20 },
        { time: "2019-01-29", value: 68.90 },
        { time: "2019-01-30", value: 66.40 },
        { time: "2019-01-31", value: 67.08 },
        { time: "2019-02-01", value: 69.78 },
        { time: "2019-02-04", value: 72.56 },
        { time: "2019-02-05", value: 72.74 },
        { time: "2019-02-06", value: 73.00 },
        { time: "2019-02-07", value: 73.38 },
        { time: "2019-02-08", value: 73.10 },
        { time: "2019-02-11", value: 73.22 },
        { time: "2019-02-12", value: 72.30 },
        { time: "2019-02-13", value: 74.86 },
        { time: "2019-02-14", value: 73.64 },
        { time: "2019-02-15", value: 73.38 },
        { time: "2019-02-18", value: 74.26 },
        { time: "2019-02-19", value: 75.00 },
        { time: "2019-02-20", value: 74.96 },
        { time: "2019-02-21", value: 75.00 },
        { time: "2019-02-22", value: 74.88 },
        { time: "2019-02-25", value: 74.96 },
        { time: "2019-02-26", value: 76.02 },
        { time: "2019-02-27", value: 77.30 },
        { time: "2019-02-28", value: 77.90 },
        { time: "2019-03-01", value: 78.24 },
        { time: "2019-03-04", value: 76.64 },
        { time: "2019-03-05", value: 78.74 },
        { time: "2019-03-06", value: 76.88 },
        { time: "2019-03-07", value: 75.32 },
        { time: "2019-03-11", value: 72.90 },
        { time: "2019-03-12", value: 74.78 },
        { time: "2019-03-13", value: 74.50 },
        { time: "2019-03-14", value: 75.34 },
        { time: "2019-03-15", value: 74.92 },
        { time: "2019-03-18", value: 75.08 },
        { time: "2019-03-19", value: 75.54 },
        { time: "2019-03-20", value: 76.78 },
        { time: "2019-03-21", value: 77.70 },
        { time: "2019-03-22", value: 77.34 },
        { time: "2019-03-25", value: 78.00 },
        { time: "2019-03-26", value: 77.98 },
        { time: "2019-03-27", value: 78.90 },
        { time: "2019-03-28", value: 78.30 },
        { time: "2019-03-29", value: 78.70 },
        { time: "2019-04-01", value: 77.22 },
        { time: "2019-04-02", value: 76.64 },
        { time: "2019-04-03", value: 76.50 },
        { time: "2019-04-04", value: 76.64 },
        { time: "2019-04-05", value: 75.46 },
        { time: "2019-04-08", value: 76.42 },
        { time: "2019-04-09", value: 77.76 },
        { time: "2019-04-10", value: 77.68 },
        { time: "2019-04-11", value: 76.60 },
        { time: "2019-04-12", value: 76.78 },
        { time: "2019-04-15", value: 76.28 },
        { time: "2019-04-16", value: 75.88 },
        { time: "2019-04-17", value: 76.38 },
        { time: "2019-04-18", value: 77.00 },
        { time: "2019-04-19", value: 77.40 },
        { time: "2019-04-22", value: 77.40 },
        { time: "2019-04-23", value: 78.20 },
        { time: "2019-04-24", value: 78.68 },
        { time: "2019-04-25", value: 78.66 },
        { time: "2019-04-26", value: 77.88 },
        { time: "2019-04-29", value: 78.02 },
        { time: "2019-04-30", value: 78.68 },
        { time: "2019-05-02", value: 78.14 },
        { time: "2019-05-03", value: 78.30 },
        { time: "2019-05-06", value: 80.06 },
        { time: "2019-05-07", value: 80.50 },
        { time: "2019-05-08", value: 80.76 },
        { time: "2019-05-10", value: 82.10 },
        { time: "2019-05-13", value: 83.72 },
        { time: "2019-05-14", value: 83.55 },
        { time: "2019-05-15", value: 84.92 },
        { time: "2019-05-16", value: 83.32 },
        { time: "2019-05-17", value: 83.04 },
        { time: "2019-05-20", value: 83.92 },
        { time: "2019-05-21", value: 84.24 },
        { time: "2019-05-22", value: 84.00 },
        { time: "2019-05-23", value: 84.26 },
        { time: "2019-05-24", value: 84.00 },
        { time: "2019-05-27", value: 83.80 },
        { time: "2019-05-28", value: 84.32 },
        { time: "2019-05-29", value: 83.88 },
        { time: "2019-05-30", value: 84.58 },
        { time: "2019-05-31", value: 81.20 },
        { time: "2019-06-03", value: 84.35 },
        { time: "2019-06-04", value: 85.66 },
        { time: "2019-06-05", value: 86.51 },
    ];

    console.log(toJS(getSingleToken))



    const HandleChartsComponent = () => {
        if(typeButtonCharts === "Liquidity"){ 
            return ( <ChartsOverview titleMarker={false} type={'Liquidity'} data ={toJS(getSingleToken.liquidity_graph)}/> ) }
        if(typeButtonCharts === "Volume"){         
            return ( <ChartsOverview  titleMarker={false} type={'Volume (24hrs)'} data ={toJS(getSingleToken.volume_graph)}/> ) }
        if(typeButtonCharts === "Price"){ 
            return ( <ChartsForm/> ) }
    }

    useEffect(()=>{
        getTokenSingleApi(address, 'day')
    }, [address])
 

    return (
        <>
            {getSingleToken.address && (
                <div className="flex w-full h-full flex-col">
                    <div className="flex justify-between w-full  flex-wrap  items-center my-5">
                            <div className="flex">
                                <button onClick={goBack}>
                                    <span>&lArr;</span> 
                                    <span className="ml-2 font-medium">Back</span>
                                </button>
                                <span className="ml-6">{getSingleToken.symbol.symbol}
                                    <span className="ml-2">&#8250;</span>
                                </span>
                                <Link to={`https://tonapi.io/account/${getSingleToken.address}.ton`} className="ml-1 w-28" target="_blank" >
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
                           <div className="ml-2 text-red-700 font-bold">{getSingleToken.current_usd_price.change} %</div>                         
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
                        <Transactions data = {getSingleToken.transactions}/>    
                    </div>  

                        {/* Token Information */}
                    
                    <div className="flex flex-col mt-5">
                        <h2 className="text-2xl font-normal">Token Iformation</h2>
                        <TokenInformation symbol = {getSingleToken.symbol} name ={getSingleToken.name} address = {getSingleToken.address}/>    
                    </div>  

                    <div className="flex w-full h-10 m-10">
                            
                    </div>
                </div>

            )}
        </>

    )
}


export const SingleTokenPage = observer(SingleTokenPageComponent)