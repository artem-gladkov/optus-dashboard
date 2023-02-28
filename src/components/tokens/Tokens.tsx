import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {toJS} from "mobx"
import uniqid from 'uniqid'
import ButtonTokens from "../buttonsGroupe/ButtonTokens"



interface Props {
    
}

const TokensComponent = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(8)

    const {buttonTokens,tokensApi, activeButtonTokens,getTokens, sortTokens,sortTokenTest} = store; 

    useEffect(()=>{
        tokensApi()
    },[])
    

    const ButtonGroupeTokens = buttonTokens.map((type, index)=>{
        return (
            <div key={uniqid()} className="flex w-1/5">
                <ButtonTokens data={getTokens} key={uniqid()}  type ={type} active = {activeButtonTokens=== type} >
                    {type}
                </ButtonTokens>
            </div>
        )

})
    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;
    const tokens =store.getTokens.slice(firstItemIndex, lastItemIndex).map((token: any, index:number)=>{
        return (
            <div key={uniqid()} className="flex w-full justify-between p-4 border-b border-gray-50 border-opacity-20">
                    <div className="w-1/3">
                        <div className="flex items-center">
                            <span className="mr-3"> {index+1}</span>
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
                    {ButtonGroupeTokens}
                </div>

            </div>
            {tokens}
            <div className="h-10">
                
            </div>
        </div>
    )
}


export const Tokens = observer(TokensComponent)


