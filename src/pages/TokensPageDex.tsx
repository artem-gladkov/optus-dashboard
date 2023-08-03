import { observer } from "mobx-react-lite"
import { SearchInput } from "../components/searchInput/SearchInput"
import { Tokens } from "../components/tokens/Tokens"
import Bg from "../components/background/bg"
import "../index.css"
import { store } from "../Store/store"
import { TPage } from "../types/types-pages"

interface Props {
    typePage: TPage
}

const TokensPageComponent = ({typePage}: Props) => {

    return (
        <div className="h-full py-14 relative  bg-bg flex flex-col justify-center">
             <div className="lg:px-14 px-4">
            <Bg/>
                <div className="flex w-full  relative flex-col text-text   z-50">
                            <div className="flex justify-between w-full  flex-wrap  items-center my-5 relative">
                                    <h2 className="flex text-3xl font-medium text-text">Top Coins</h2>
                                    <div className="w-1/2">
                                        {/* <SearchInput /> */}
                                    </div>
                            </div>
                                    <Tokens typePage={typePage}/>
                </div>
          
            </div>
        </div>

    )
}


export const TokensPageDex = observer(TokensPageComponent)