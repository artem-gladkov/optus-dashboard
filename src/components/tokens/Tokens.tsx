import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import uniqid from 'uniqid'
import {ButtonTokens} from "../buttonsGroupe/ButtonGroupeForm"
import { Pagination } from "../pagination/Pagination";


interface Props {
    
}

const TokensComponent = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemPerPage, setItemPerPage] = useState(8)

    const {buttonTokens,tokensApi, activeButtonTokens,getTokens} = store; 

    useEffect(()=>{
        tokensApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const lastItemIndex = currentPage * itemPerPage;
    let firstItemIndex = lastItemIndex - itemPerPage;
    let idx = firstItemIndex+1
    const tokens = getTokens.slice(firstItemIndex, lastItemIndex)
                                  .map((token: any, index:number)=>{
                                        return (
                                            <div key={uniqid()} className="flex w-full justify-between p-4 border-b border-gray-50 border-opacity-20">
                                                    <div className="w-1/3">
                                                        <div className="flex items-center">
                                                            <span className="mr-3"> {idx++}</span>
                                                            <img className="mr-3" src={token.icon} alt="imgToken" style={{width: 20, height: 20}}/>
                                                            <Link to={`/tokens/${token.address}`}>   <span className="font-medium text-slate-900 text-opacity-80 hover:text-slate-50 ">{token.name}</span>  </Link>
                                                        </div>
                                                    </div>
                                                    <div className="flex w-2/3">
                                                        <div className="flex w-1/5"><span>{token.symbol}</span></div>
                                                        <div className="flex w-1/5"><span>{token.liquidity.value} $</span></div>
                                                        <div className="flex w-1/5"><span>{token.volume_24h.value} $</span></div>
                                                        <div className="flex w-1/5"><span className="flex">{token.current_usd_price.value} $</span></div>
                                                        <div className="flex whitespace-nowrap w-1/5"><span>{token.current_usd_price.change} %</span></div>
                                                    </div>
                                            </div>
                                        )
                                })

    return (
        <div className="w-full h-full border rounded-2xl mt-4 ">
            <div className="flex  w-full  p-4 border-b border-gray-50 border-opacity-60">
                <div  className="w-1/3"> 
                    <div>Name</div>
                </div>

                <div className="flex w-2/3 ">
                   <ButtonTokens arrButtons={buttonTokens} data={getTokens} key={uniqid()}  active = {activeButtonTokens} type='tokens'/>
                </div>

            </div>
            {tokens}
            <div className="flex justify-center items-center">
                <Pagination totalItem={store.getTokens.length} 
                            itemPerPage={itemPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}/>
            </div>
        </div>
    )
}


export const Tokens = observer(TokensComponent)


