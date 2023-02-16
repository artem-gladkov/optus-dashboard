import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import {toJS} from "mobx"


interface Props {
    
}

const PairsComponent = (props: Props) => {

    useEffect(()=>{
        store.pairsApi()
    },[])
    
    

   const pairs =toJS(store.getPairs.map((pair: any, index:number)=>{
    return (
        <div key={index } className="flex w-full justify-between p-2">
                <div className="w-1/3">
                    <div className="flex items-center">
                        <span className="mr-3"> {index+1}</span>
                        <img className="-mr-2" src={pair.symbol_one.icon} alt="imgToken1" style={{width: 20, height: 20}}/>
                        <img className="mr-3" src={pair.symbol_two.icon} alt="imgToken2" style={{width: 20, height: 20}}/>
                        <span>{pair.symbol_one.symbol +  '-' + pair.symbol_two.symbol}</span>  
                    </div>
                </div>
                <div className="flex w-1/3">
                    <div className="flex w-1/3"><span>{pair.liquidity.value}</span></div>
                    <div className="flex w-1/3"><span>{pair.volume_24h.value} $</span></div>
                    <div className="flex w-1/3"><span>{pair.volume_7d.value} $</span></div>
                </div>
                <div className="flex w-1/3">
                    <div className="flex w-full">
                        <div className="flex w-1/2 justify-center"><span className="flex">{pair.fees_24h.value} $</span></div>
                        <div className="flex  whitespace-nowrap w-1/2"><span>{pair.volume_24h.change} %</span></div>
                    </div>
                </div>
         </div>
    )
   }))

    return (
        <div className="w-full border rounded-2xl mt-4">
            <div className="flex  w-full  p-2">
                <div  className="w-1/3"> 
                    <div>Name</div>
                </div>

                <div className="flex w-1/3 ">
                    <div className="flex w-1/3">Liquidity &dArr;</div>
                    <div className="flex w-1/3">Volume (24hrs)</div>
                    <div className="flex w-1/3">Volume (7d) </div>
                </div>
                <div className="flex w-1/3 ">
                    <div className="flex w-full justify-center">
                        <div className="flex w-1/2 justify-center"><span className="flex ">Fees (24hrs)</span> </div>
                        <div className="flex  whitespace-nowrap w-1/2">1y Feels/Liquidity</div>
                    </div>
                </div>

            </div>
      
            {pairs}
        </div>
    )
}


export const Pairs = observer(PairsComponent)