import { observer } from "mobx-react-lite"
import { Pairs } from "../components/pairs/Pairs"

import "../index.css"

interface Props {
    
}

const PairsPageComponent = (props: Props) => {



    return (
        <div className="flex w-full h-full flex-col">
            <div className="flex justify-around w-full  flex-wrap  items-center my-5">
                    <h2 className="flex text-3xl font-medium">Top Pairs</h2>
                    <input type="text" className="inputSearch h-6" />
            </div>
            <Pairs/>

        </div>
    )
}


export const PairsPage = observer(PairsPageComponent)