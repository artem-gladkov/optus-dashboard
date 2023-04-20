import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Pairs } from "../components/pairs/Pairs"
import { SearchInput } from "../components/searchInput/SearchInput"
import Bg from '../components/background/bg'
import { store } from "../Store/store"
import "../index.css"
import { useParams } from "react-router-dom"


interface Props {
    
}

const PairsPageComponent = (props: Props) => {

    const {getPairs, updateHandlerButtonDexBo, activeButtonDex} = store
    const {dex} = useParams()
    useEffect(()=>{
        store.pairsApi(dex)
        updateHandlerButtonDexBo(true)
    }, [])

    return (
        <div className="h-full py-14 relative  bg-bg flex flex-col justify-center mt-14">
            <div className="lg:px-14 ">
                <Bg/>
                <div className="flex w-full relative flex-col text-text z-50">
                    <div className="flex justify-between w-full  flex-wrap  items-center my-5 z-50">
                            <h2 className="flex text-3xl font-medium">Top Pairs {activeButtonDex}</h2>
                            <div className="w-1/2">
                                {/* <SearchInput /> */}
                            </div>
                    </div>
                    <Pairs data= {getPairs}/>
                </div>
            </div>
        </div>

    )
}


export const PairsPage = observer(PairsPageComponent)