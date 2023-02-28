import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import {toJS} from "mobx"
import { Link } from "react-router-dom"
import uniqid from 'uniqid'
import ButtonPairs from "../buttonsGroupe/ButtonPairs"
import FavouritesButton from "../favouritesButton/FavouritesButton"

interface Props {
    data: any
}

const PairsComponent = ({data}: Props) => {

    useEffect(()=>{
        store.pairsApi()
    },[])
    const {getPairs, buttonPairs, activeButtonPairs} = store
    
    console.log('pairs', toJS(getPairs))
    const ButtonGroupePairs = buttonPairs.map((type, index)=>{
        return (
            <div key={uniqid()} className="flex w-1/5">
                <ButtonPairs data={getPairs} key={uniqid()}  type ={type} active = {activeButtonPairs=== type} >
                    {type}
                </ButtonPairs>
            </div>
        )

})



   const pairs =data.map((pair: any, index:number)=>{
    return (
        <div key={uniqid()} className="flex w-full justify-between p-4 border-b border-gray-50 border-opacity-20">
                <div className="w-1/3">
                    <div className="flex items-center ">
                        <span className="mr-3"> {index+1}</span>
                        <img className="-mr-2 z-10" src={pair.token_one.icon} alt="imgToken1" style={{width: 20, height: 20}}/>
                        <img className="mr-3" src={pair.token_two.icon} alt="imgToken2" style={{width: 20, height: 20}}/>
                        <Link to={`/pairs/${pair.address}`}>   <span className=" font-medium text-slate-900 text-opacity-80 hover:text-slate-50 "> <span>{pair.name}</span></span>  </Link>
                    </div>
                </div>
                <div className="flex w-2/3 ">
                    <div className="flex w-1/5 "><span>{pair.liquidity.value} $</span></div>
                    <div className="flex w-1/5"><span>{pair.volume_24h.value} $</span></div>
                    <div className="flex w-1/5"><span>{pair.volume_7d.value} $</span></div>
                    <div className="flex w-1/5"><span className="flex">{pair.fees_24h.value} $</span></div>
                    <div className="flex  whitespace-nowrap w-1/5"><span>{pair.volume_24h.change} %</span></div>
         </div>
        </div>
    )
   })

    return (
        <>
        {
            store.getPairs && (
                <div className="w-full border rounded-2xl mt-4">
            <div className="flex  w-full  p-4 border-b border-gray-50 border-opacity-60">
                <div  className="w-1/3"> 
                    <div>Name</div>
                </div>

                <div className="flex w-2/3 ">
                        {ButtonGroupePairs}
                </div>

            </div>
      
            {pairs}
            <div className="h-10"></div>
        </div>
            )
        }
        </>
        
        
    )
}


export const Pairs = observer(PairsComponent)