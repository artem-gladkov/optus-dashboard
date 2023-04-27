import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import {toJS} from "mobx"
import { Link, useParams } from "react-router-dom"
import uniqid from 'uniqid'
import FavouritesButton from "../favouritesButton/FavouritesButton"
import { Pagination } from "../pagination/Pagination";
import {ButtonTokens} from "../buttonsGroupe/ButtonGroupeForm"
import { numberWithSpaces } from "../../function/numberWithSpaces"
import { numberColor } from "../../function/colorChanges"
import Spinner from "../spinner/Spinner"
import useMedia from "../../hooks/useMedia"

interface Props {
    data: any
}

const PairsComponent = ( {data}: Props) => {
    const matches = useMedia("(min-width: 835px)")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(8)
    const {getPairs, buttonPairs, activeButtonPairs, pairsApi, getErrorPairs, activeButtonDex} = store
    const {dex} = useParams()
    useEffect(()=>{
        pairsApi(dex)
    },[activeButtonDex])
   
    
console.log(toJS(data))
    const lastItemIndex = currentPage * itemPerPage;
    let firstItemIndex = lastItemIndex - itemPerPage;
    let idx = firstItemIndex+1

   const pairs =data?.slice(firstItemIndex, lastItemIndex).map((pair: any, index:number)=>{
    
    return (
        <div key={uniqid()} className="flex w-full justify-between p-4 border-b border-inActive border-opacity-20">
                <div className="lg:w-1/3 w-1/4">
                    <div className="flex items-center ">
                        <span className="mr-3"> {idx++}</span>
                        <img className="-mr-2 z-10" src={pair.token_one.icon} alt="imgToken1" style={{width: 20, height: 20}}/>
                        <img className="mr-3" src={pair.token_two.icon} alt="imgToken2" style={{width: 20, height: 20}}/>
                        <Link to={`/${dex || 'STON.fi'}/pairs/${pair.address}`}>   <span className=" font-medium text-slate-900 text-opacity-80 hover:text-slate-50 "> <span>{pair.name}</span></span>  </Link>
                    </div>
                </div>
                <div className="flex lg:w-2/3 w-3/4">
                    {
                       pair.liquidity?.value && (
                        <>
                            <div className={!matches ? 'flex w-1/2 justify-end' : 'flex w-1/5'}><span>{numberWithSpaces(pair.liquidity.value)} $</span></div>
                            <div className={!matches ? 'flex w-1/2 justify-end' : 'flex w-1/5'}><span>{pair.volume_24h.value} $</span></div>
                            <div className={!matches ? 'hidden' : 'flex w-1/5'}><span>{pair.volume_7d.value} $</span></div>
                            <div className={!matches ? 'hidden' : 'flex w-1/5'}><span className="flex">{pair.fees_24h.value} $</span></div>
                            <div className={!matches ? 'hidden' : `${numberColor(pair.fees_liquidity_ratio.value)} flex  whitespace-nowrap w-1/5 font-bold`}><span className="whitespace-nowrap">{pair.fees_liquidity_ratio.value} %</span></div>

                        </>
                       )
                    }
                </div>
        </div>
    )
   })

    return (
       
                <div className="w-full border rounded-2xl mt-4 bg-form border-inActive text-xs sm:text-base">
                    <div className="flex  w-full  p-4 border-b border-inActive border-opacity-60">
                        <div  className="lg:w-1/3 w-1/4 font-medium"> 
                            <div>Name</div>
                        </div>

                        <div className={`flex ${!matches ? 'w-3/4' : 'w-2/3'} whitespace-nowrap`}>
                        <ButtonTokens 
                                arrButtons={!matches ? ['Liquidity', 'Volume (24hrs)'] : buttonPairs} 
                                data={getPairs} 
                                key={uniqid()}  
                                active = {activeButtonPairs} 
                                type='pairs'/>
                        </div>
                    </div>

                    {data.length ? (
                                <>
                                    {!getErrorPairs ? pairs : 'Произошла ошибка, но мы решаем эту проблему'}
                                </>
                                ) : ( getErrorPairs ? 'Произошла ошибка, но мы решаем эту проблему' : ( 
                                                <div className='w-full h-full flex justify-center  items-center'>
                                                    <Spinner/>
                                                </div>) ) }
                   
                    <div className="flex justify-center items-center">
                        <Pagination totalItem={data?.length} 
                                    itemPerPage={itemPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}/>
                    </div>
                </div>
            )
        }




export const Pairs = observer(PairsComponent)