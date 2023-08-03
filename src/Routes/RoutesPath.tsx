import {Routes, Route} from "react-router-dom"
import { PairsPage} from '../pages/PairsPage';
import { Overview } from '../pages/OverviewPage';
import { TokensPage } from '../pages/TokensPage';
import {NotfoundPage} from "../pages/NotfoundPage";
import {Layout} from "../components/Layout/Layout";
import { SingleTokenPage } from "../pages/SingleTokenPage";
import { SinglePairPage } from "../pages/SinglePairPage";
import { OverviewDex } from "../pages/OverviewDex";
import {AccauntsAnalitics} from "../pages/AccauntsAnalitics";
import { observer } from "mobx-react-lite"
import { PairsPageDex } from "../pages/PairsPageDexs";
import { TokensPageDex } from "../pages/TokensPageDex";

interface Props {
    
}

const RoutesPathComponent = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element = {<AccauntsAnalitics/>} />
                <Route path="overview" element = {<Overview/>} />
                <Route path="overview/:dex" element = {<Overview/>} />
                <Route path="overview/:dex/tokens" element = {<TokensPage typePage="overview"/>} />
                <Route path="overview/:dex/tokens/:address" element = {<SingleTokenPage  typePage="overview"/>} />
                <Route path="overview/:dex/pairs" element = {<PairsPage typePage="overview"/>} />
                <Route path="overview/:dex/pairs/:address" element = {<SinglePairPage  typePage="overview"/>} />
                <Route path="dexoverview" element = {< OverviewDex/>} />
                <Route path="dexoverview/pairs" element = {< PairsPageDex typePage="dexoverview" />} />
                <Route path="dexoverview/pairs/:address" element = {< SinglePairPage  typePage="dexoverview" />} />
                <Route path="dexoverview/tokens" element = {< TokensPageDex typePage="dexoverview"/>} />
                <Route path="dexoverview/tokens/:address" element = {< SingleTokenPage  typePage="dexoverview"/>} />
                <Route path="*" element = {<NotfoundPage/>} />
            </Route>   
        </Routes>
    )
}

export const RoutesPath = observer(RoutesPathComponent)

