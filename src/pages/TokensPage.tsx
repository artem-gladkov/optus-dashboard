import { observer } from "mobx-react-lite"
import { SearchInput } from "../components/searchInput/SearchInput"
import { Tokens } from "../components/tokens/Tokens"
import Bg from "../components/background/bg"
import "../index.css"
import { store } from "../Store/store"

interface Props {
    
}

const TokensPageComponent = (props: Props) => {
    const {activeButtonDex} = store
    return (
        <div className="h-full py-14 relative  bg-bg flex flex-col justify-center mt-14">
             <div className="lg:px-14 px-4">
            <Bg/>
            
                <div className="flex w-full  relative flex-col text-text   z-50">
                            <div className="flex justify-between w-full  flex-wrap  items-center my-5 relative">
                                    <h2 className="flex text-3xl font-medium text-text">Top Jettons {activeButtonDex}</h2>
                                    <div className="w-1/2">
                                        {/* <SearchInput /> */}
                                    </div>
                            </div>
                                    <Tokens/>
                </div>
          
            </div>
        </div>

    )
}


export const TokensPage = observer(TokensPageComponent)