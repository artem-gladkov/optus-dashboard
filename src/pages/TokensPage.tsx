import { observer } from "mobx-react-lite"
import { Tokens } from "../components/tokens/Tokens"

import "../index.css"

interface Props {
    
}

const TokensPageComponent = (props: Props) => {

    return (
        <div className="flex w-full  flex-col">
            <div className="flex justify-around w-full  flex-wrap  items-center my-5">
                    <h2 className="flex text-3xl font-medium">Top Tokens</h2>
                    <input type="text" className="inputSearch h-6" />
            </div>
            <Tokens/>
        </div>
    )
}


export const TokensPage = observer(TokensPageComponent)