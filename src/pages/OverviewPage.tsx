/* eslint-disable react-hooks/exhaustive-deps */
import { Tokens } from '../components/tokens/Tokens'
import { observer } from "mobx-react-lite"
import { Pairs } from '../components/pairs/Pairs'
import { store } from '../Store/store'
import { useEffect } from "react"
import {toJS} from "mobx"
import { Transactions } from '../components/transactions/Transactions'
import { ChartsOverview } from '../components/charts/ChartsOverview'
import { ChartsOverview2 } from '../components/charts/ChartsOverview2'
import uniqid from 'uniqid'

interface Props {
    
}

const OverviewComponent = (props: Props) => {
    const initialData = [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ];
    

    const {overviewApi, getOverview} = store

    useEffect(()=>{
        overviewApi('day')
    }, [])

    console.log(toJS(getOverview))

    
    return (<><div className='h-full'>
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
            <div className='w-1/2 mr-2 bg-cyan-700 bg-opacity-40 rounded-2xl'>
                    <ChartsOverview data ={getOverview.liquidity_graph} />
            </div>

            <div className='w-1/2 bg-cyan-700 bg-opacity-40 rounded-2xl'>
                    <ChartsOverview2 data ={initialData} />
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

        <div key={uniqid()} className='flex  flex-col mt-10'>
            <h1 className='font-medium text-2xl '>Transactions</h1>
            <Transactions data = {getOverview.transactions}/>
        </div>


    </div>
    <div className='h-20'></div>
</div></>
        
    )
}

export const Overview = observer(OverviewComponent)