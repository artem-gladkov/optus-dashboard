/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from "../Store/store"
import { toJS } from "mobx"
import { TokenForm } from "../components/tokenForm/TokenForm"

interface Props {
    
}

const SinglePairPageComponent = (props: Props) => {
    const {getSinglePair, getPairSingleApi}  = store
    const {address} = useParams()    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1)

    useEffect(()=>{
        getPairSingleApi(address, 'day')
    }, [address])

    console.log(toJS(getSinglePair))
  
    
    return ( 
        <>
            {getSinglePair.address && (
                <div className="flex w-full h-full flex-col">
                    <div className="flex justify-between w-full  flex-wrap  items-center my-5">
                            <div className="flex">
                                <button onClick={goBack}>
                                    <span>&lArr;</span> 
                                    <span className="ml-2 font-medium">Back</span>
                                </button>
                                <span className="ml-6">{getSinglePair.symbol_one.symbol}-{getSinglePair.symbol_two.symbol}
                                </span>

                            </div>
                            <input type="text" className="inputSearch h-6" />
                    </div>

                    <div className="flex justify-between items-end mt-10">
                        <div className="flex items-end ">
                           <div className="flex text-3xl font-medium">
                                <div className="z-10"><img src={getSinglePair.symbol_one.icon} alt="iconToken" width={36} height={36}/></div>
                                <div className="-ml-4"><img src={getSinglePair.symbol_two.icon} alt="iconToken" width={36} height={36}/></div>
                                <div className="ml-4">
                                    {getSinglePair.symbol_one.symbol}-{getSinglePair.symbol_two.symbol} <span>Pair</span> 
                                </div>
                            </div>
                      
                        </div>
                        <div>
                            Добавить в избранное
                        </div>
                    </div>

                    <div className="flex mt-8">
                        <div className="items-center bg-cyan-700 bg-opacity-40 rounded-lg px-3 py-1 hover:bg-opacity-70 mr-2">
                            <Link to={''}> 
                                <button> 
                                    {`1 ${getSinglePair.symbol_one.symbol} =< ${getSinglePair.symbol_one_indicators.current_pair_price.value} ${getSinglePair.symbol_two.symbol} (${getSinglePair.symbol_one_indicators.current_usd_price.value} $)`}
                                </button>
                            </Link>    
                        </div>
                        <div className="items-center bg-cyan-700 bg-opacity-40 rounded-lg px-3 py-1 hover:bg-opacity-70 mr-2">
                            <Link to={''}> 
                                <button> 
                                    {`1 ${getSinglePair.symbol_two.symbol} =< ${getSinglePair.symbol_two_indicators.current_pair_price.value} ${getSinglePair.symbol_one.symbol} (${getSinglePair.symbol_two_indicators.current_usd_price.value} $)`}
                                </button>
                            </Link>    
                        </div>
                    </div>

                            {/* статистика по паре */}

                    <div className="flex flex-col mt-10">
                        <div className="text-xl">Pair Stats</div>
                        <div className="flex justify-between mt-3">
                              {/* левая часть*/}

                            <div className="flex flex-col w-4/12 mr-2">
                                <TokenForm title={'Liquidity'} value={getSinglePair.liquidity.value} change={getSinglePair.liquidity.change}/>
                                <TokenForm title={'Volume (24hrs)'} value={getSinglePair.volume_24h.value} change={getSinglePair.volume_24h.change}/>
                                <TokenForm title={'Fees (24hrs)'} value={getSinglePair.fees_24h.value} change={getSinglePair.fees_24h.change}/>
                                <div className="flex flex-col bg-cyan-700 bg-opacity-40 rounded-2xl p-4 mb-2">
                                    <div className='mb-3'>
                                        <h3>Pooled Tokens</h3>
                                    </div>
                                    <div className="flex">
                                        <div className="mb-3">
                                            <img src={getSinglePair.symbol_one.icon} alt="iconToken" width={24} height={24}/> 
                                        </div>
                                        <div className="ml-2"> <span>{getSinglePair.symbol_one_indicators.pool_quantity.value}</span> {getSinglePair.symbol_one.symbol}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="mb-3">
                                            <img src={getSinglePair.symbol_two.icon} alt="iconToken" width={24} height={24}/> 
                                        </div>
                                        <div className="ml-2"> <span>{getSinglePair.symbol_two_indicators.pool_quantity.value}</span> {getSinglePair.symbol_two.symbol}</div>
                                    </div> 
                                 </div>
                            </div>
                            <div className="w-8/12 bg-cyan-700 bg-opacity-40 rounded-2xl mb-2">
                                        график
                            </div>
                        </div>
                    </div>

                        {/* Top PAIRS */}

                    <div className="flex flex-col mt-5">
                        <h2 className="text-2xl font-normal">Top Pairs</h2>   
                    </div>  
                </div>

            )}
        </>

    )
}

export const  SinglePairPage = observer(SinglePairPageComponent)
