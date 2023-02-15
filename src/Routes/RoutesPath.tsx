import {Routes, Route} from "react-router-dom"
import { PairsPage} from '../pages/PairsPage';
import { Overview } from '../pages/OverviewPage';
import { TokensPage } from '../pages/TokensPage';
import {NotfoundPage} from "../pages/NotfoundPage";
import {Layout} from "../components/Layout/Layout";
import { SingleTokenPage } from "../pages/SingleTokenPage";


import { observer } from "mobx-react-lite"

interface Props {
    
}

const RoutesPathComponent = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element = {<Overview/>} />
                <Route path="tokens" element = {<TokensPage/>} />
                <Route path="tokens/:address" element = {<SingleTokenPage/>} />
                <Route path="pairs" element = {<PairsPage/>} />
                <Route path="*" element = {<NotfoundPage/>} />
            </Route>   
        </Routes>
    )
}

export const RoutesPath = observer(RoutesPathComponent)

