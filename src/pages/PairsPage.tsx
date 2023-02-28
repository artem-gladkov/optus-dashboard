import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Pairs } from "../components/pairs/Pairs"
import { SearchInput } from "../components/searchInput/SearchInput"

import "../index.css"
import { store } from "../Store/store"

interface Props {
    
}

const PairsPageComponent = (props: Props) => {

    const {getPairs} = store

    useEffect(()=>{
        store.pairsApi()
    }, [])

    return (
        <div className="flex w-full  flex-col">
            <div className="flex justify-around w-full  flex-wrap  items-center my-5">
                    <h2 className="flex text-3xl font-medium">Top Pairs</h2>
                    <div className="w-1/2">
                                <SearchInput />
                            </div>
            </div>
            <Pairs data= {getPairs}/>

        </div>
    )
}


export const PairsPage = observer(PairsPageComponent)