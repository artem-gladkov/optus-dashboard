import {Routes, Route} from "react-router-dom"
import { PairsPage} from '../pages/PairsPage';
import { Overview } from '../pages/OverviewPage';
import { TokensPage } from '../pages/TokensPage';
import {NotfoundPage} from "../pages/NotfoundPage";
import {Layout} from "../components/Layout/Layout";
import { SingleTokenPage } from "../pages/SingleTokenPage";
import { SinglePairPage } from "../pages/SinglePairPage";
import { Welcome } from "../pages/Welcom";
import { observer } from "mobx-react-lite"

interface Props {
    
}

const RoutesPathComponent = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element = {<Overview/>} />
                <Route path="/dex" element = {<Overview/>} /> 
                <Route path=":dex" element = {<Overview/>} />
                 
                <Route path=":dex/tokens" element = {<TokensPage/>} />
                <Route path=":dex/tokens/:address" element = {<SingleTokenPage/>} />
                <Route path=":dex/pairs" element = {<PairsPage/>} />
                <Route path=":dex/pairs/:address" element = {<SinglePairPage/>} />

                {/* <Route path=":dex/:tokens" element = {<TokensPage/>} />
                <Route path=":dex/:tokens/:address" element = {<SingleTokenPage/>} />
                <Route path=":dex/:pairs" element = {<PairsPage/>} />
                <Route path=":dex/:pairs/:address" element = {<SinglePairPage/>} /> */}
                <Route path="*" element = {<NotfoundPage/>} />
            </Route>   
        </Routes>
    )
}

export const RoutesPath = observer(RoutesPathComponent)

