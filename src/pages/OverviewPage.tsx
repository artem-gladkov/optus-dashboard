/* eslint-disable react-hooks/exhaustive-deps */
import { Tokens } from '../components/tokens/Tokens'
import { observer } from "mobx-react-lite"
import { Pairs } from '../components/pairs/Pairs'
import { store } from '../Store/store'
import { useEffect } from "react"
import {toJS} from "mobx"
import { Transactions } from '../components/transactions/Transactions'


interface Props {
    
}

const OverviewComponent = (props: Props) => {

    const {overviewApi, getOverview} = store

    useEffect(()=>{
        overviewApi('day')
    }, [])

    console.log(toJS(getOverview))
    
    return (
        <div className='h-full'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-3xl'>Analytics</h1>
                <input type="text" className="inputSearch h-10 mt-7" placeholder='Search pairs and tokens ...'/>
                <div className='flex mt-5 mb-5'>
                   <div className="mr-4"> ETH Price: <span>1504</span>$  </div>
                   <div className="mr-4">  Transaction (24H): <span>92,996</span> </div>
                   <div className="mr-4">    Pairs: <span>145,887</span>  </div>
                   <div className="mr-4">  Fees (24H): <span>470 277</span>$ </div>
                </div>

                {/* Графики */}
                <div className='flex'>
                    <div className='h-80 w-1/2 mr-2 bg-cyan-700 bg-opacity-40 rounded-2xl'>
                            график
                    </div>

                    <div className='h-80 w-1/2 bg-cyan-700 bg-opacity-40 rounded-2xl'>
                            график
                    </div>
                </div>

                {/* Топ монет */}
                <div className='flex  flex-col mt-10'>
                    <h1 className='font-medium text-2xl '>Top Tokens</h1>
                    <Tokens/>
                </div>

                {/* Топ пар */}

                <div className='flex  flex-col mt-10'>
                    <h1 className='font-medium text-2xl '>Top Pairs</h1>
                    <Pairs/>
                </div>

                 {/* Транзакции */}

                <div className='flex  flex-col mt-10'>
                    <h1 className='font-medium text-2xl '>Transactions</h1>
                    <Transactions data = {getOverview.transactions}/>
                </div>


            </div>
            <div className='h-20'></div>
        </div>
    )
}

export const Overview = observer(OverviewComponent)