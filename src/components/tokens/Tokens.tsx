import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import {toJS} from "mobx"


interface Props {
    
}

const TokensComponent = (props: Props) => {

    useEffect(()=>{
        store.tokensApi()
    },[])
    


   const tokens =toJS(store.getTokens.map((token: any, index:number)=>{
    return (
        <div key={token.symbol.name.trim()} className="flex w-full justify-between p-2">
                <div className="w-1/3">
                    <div className="flex items-center">
                        <span className="mr-3"> {index+1}</span>
                        <img className="mr-3" src={token.symbol.icon} alt="imgToken" style={{width: 20, height: 20}}/>
                         <Link to={`/tokens/${token.address}`}>   <span className="text-base font-medium text-slate-50 text-opacity-80 hover:text-opacity-100">{token.symbol.name}</span>  </Link>
                    </div>
                </div>
                <div className="flex w-1/3">
                    <div className="flex w-1/3"><span>{token.symbol.symbol}</span></div>
                    <div className="flex w-1/3"><span>{token.liquidity.value} $</span></div>
                    <div className="flex w-1/3"><span>{token.volume_24h.value} $</span></div>
                </div>
                <div className="flex w-1/3">
                    <div className="flex w-full">
                        <div className="flex w-1/2 justify-center"><span className="flex">{token.current_usd_price.value} $</span></div>
                        <div className="flex  whitespace-nowrap w-1/2"><span>{token.current_usd_price.change} %</span></div>
                    </div>
                </div>
         </div>
    )
   }))

    return (
        <div className="w-full h-full border rounded-2xl mt-4">
            <div className="flex  w-full  p-2">
                <div  className="w-1/3"> 
                    <div>Name</div>
                </div>

                <div className="flex w-1/3 ">
                    <div className="flex w-1/3">Symbol</div>
                    <div className="flex w-1/3">Liquidity</div>
                    <div className="flex w-1/3">Volume (24hrs) &dArr;</div>
                </div>
                <div className="flex w-1/3 ">
                    <div className="flex w-full justify-center">
                        <div className="flex w-1/2 justify-center"><span className="flex ">Price</span> </div>
                        <div className="flex  whitespace-nowrap w-1/2">Price Change (24hrs)</div>
                    </div>
                </div>

            </div>
            {tokens}
        </div>
    )
}


export const Tokens = observer(TokensComponent)