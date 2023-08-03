/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Pairs } from "../components/pairs/Pairs"
import Bg from '../components/background/bg'
import { store } from "../Store/store"
import "../index.css"
import { useParams } from "react-router-dom"
import { TPage } from "../types/types-pages"

interface Props {
    typePage: TPage
}



const PairsPageDexComponent = ({typePage}: Props) => {

    const {getPairs, activeButtonDex, pairsApi} = store
    const {dex} = useParams()
    useEffect(()=>{
        pairsApi(dex)
    }, [])

    return (
        <div className="h-full py-14 relative  bg-bg flex flex-col justify-center">
            <div className="lg:px-14 px-4">
                <Bg/>
                <div className="flex w-full relative flex-col text-text z-50">
                    <div className="flex justify-between w-full  flex-wrap  items-center my-5 z-50">
                            <h2 className="flex text-3xl font-medium">Top Pairs</h2>
                    </div>
                    <Pairs typePage={typePage} data= {getPairs}/>
                </div>
            </div>
        </div>

    )
}


export const PairsPageDex = observer(PairsPageDexComponent)