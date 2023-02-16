/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from "../Store/store"
import { toJS } from "mobx"
import { TokenForm } from "../components/tokenForm/TokenForm"
import { Pairs } from "../components/pairs/Pairs"

export const SingleTokenPageComponent=(props: any) => {

    const {getSingleToken, getTokenApi}  = store
    const {address} = useParams()    
    const navigate = useNavigate()

    const goBack = ()=> navigate(-1)



    useEffect(()=>{
        getTokenApi(address, 'day')
    }, [address])
 

   console.log(toJS(getSingleToken))

    return (
        <>
            {getSingleToken.address && (
                <div className="flex w-full h-full flex-col mt-8">
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
                            <input type="text" className="inputSearch h-6" />
                    </div>

                    <div className="flex justify-between items-end mt-10">
                        <div className="flex items-end ">
                           <div><img src={getSingleToken.symbol.icon} alt="" width={40}/></div> 
                           <div className="text-3xl ml-2">{getSingleToken.symbol.name}</div>
                           <div className="text-3xl ml-2">({getSingleToken.symbol.symbol})</div>
                           <div className="text-xl ml-2">{getSingleToken.current_usd_price.value}$</div>
                           <div className="ml-2 text-red-700 font-bold">{getSingleToken.current_usd_price.change} %</div>                         
                        </div>
                        <div>
                            Добавить в избранное
                        </div>
                    </div>

                            {/* статистика по монете */}

                    <div className="flex flex-col mt-10">
                        <div className="text-xl">Token Stats</div>
                        <div className="flex justify-between mt-3">
                              {/* левая часть*/}

                            <div className="flex flex-col w-4/12 mr-2">
                                <TokenForm title={'Liquidity'} value={235454} change={4}/>
                                <TokenForm title={'Volume (24hrs)'} value={235454} change={4}/>
                                <TokenForm title={'Transactions (24hrs)'} value={235454} change={4}/>
                            </div>
                            <div className="w-8/12 bg-cyan-700 bg-opacity-40 rounded-2xl mb-2">
                                        график
                            </div>

                        </div>
                    </div>

                        {/* Top PAIRS */}

                    <div className="mt-5">
                        <h2 className="flex text-2xl font-normal">Top Pairs</h2>
                        <Pairs/>    
                    </div>    
                </div>

            )}
        </>

    )
}


export const SingleTokenPage = observer(SingleTokenPageComponent)