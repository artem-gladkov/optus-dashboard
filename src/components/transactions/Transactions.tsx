/* eslint-disable array-callback-return */
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { store } from "../../Store/store";
import uniqid from 'uniqid'
import { useEffect, useState } from "react";
import { Pagination } from "../pagination/Pagination";
import {ButtonTokens} from "../buttonsGroupe/ButtonGroupeForm"
import { toJS } from "mobx";
import { timeTransactions } from "../../function/timeTransactions";
import Spinner from "../spinner/Spinner";

interface Props {
    data: any;
    address?: string;
    error: boolean
}

const TransactionsComponent = ({data, address, error}: Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemPerPage, setItemPerPage] = useState(8)



    const {buttonFilterTransaction, 
        buttonTransactions, 
        activeButtonTransactions, 
        activeButtonFilter, 
        getErrorTransactions, 
     } = store


    const dataFilter = data?.filter((trans: { type: string; }) => {
        if(activeButtonFilter=== 'All'){return trans}
        if(activeButtonFilter === 'Swaps'){return trans?.type === 'swap'}
        if(activeButtonFilter === 'Adds'){return trans?.type === 'add'}
        if(activeButtonFilter=== 'Removes'){return trans?.type === 'remove'}
    })

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;    
    const transaction = dataFilter?.slice(firstItemIndex, lastItemIndex)
        .map((trans)=>{
        return (
            <div key={uniqid()} className="flex w-full justify-between text-base p-4 border-b border-gray-50 border-opacity-20">
                    <div  className="w-1/3">
                        <div  className="flex items-center">
                            <Link  to={`https://tonapi.io/transaction/${trans.hash}`} target="_blank">
                                <span className="font-medium text-slate-900 text-opacity-80 hover:text-slate-50 ">
                                    {trans.type} {trans?.symbol_one?.symbol} for {trans?.symbol_two?.symbol}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div  className="flex w-2/3 ">
                        <div  className="flex w-1/5"><span>{trans.usd_amount.value} $</span></div>
                        <div  className="flex w-1/5"><span>{trans.symbol_one_amount.value} {trans.symbol_one.symbol}</span></div>
                        <div  className="flex w-1/5"><span>{trans?.symbol_two_amount?.value} {trans?.symbol_two?.symbol}</span></div>
                        <div  className="flex w-1/5">
                            <Link to={`https://tonapi.io/account/${trans.account}`} target="_blank">
                                <span className="font-medium text-slate-900 text-opacity-80 hover:text-slate-50 ">
                                    {`${trans.account.slice(0,4)}...${trans.account.slice(-4)}`}
                                </span>
                            </Link> 
                        </div>
                        <div  className="flex  whitespace-nowrap w-1/5"><span>{timeTransactions(trans.timestamp)}</span></div>
                    </div>
            </div>
        )
    })


 return (
        <div key={uniqid()} className="w-full h-full border rounded-2xl mt-4 ">
            <div className="flex  w-full  p-4 border-b border-gray-50 border-opacity-60">
                <div  className="w-1/3"> 
                    <div className="flex justify-between w-1/2">
                        <ButtonTokens arrButtons={buttonFilterTransaction} data={data} key={uniqid()}  active = {activeButtonFilter} type='filter_transactions'/>
                    </div>
                </div>
                <div className="flex w-2/3 ">
                    <ButtonTokens arrButtons={buttonTransactions} data={data} key={uniqid()}  active = {activeButtonTransactions} type='transactions'/>
                </div>
            </div>


                {dataFilter ? (
                                <>
                                    {error ? 'Произошла ошибка, но мы решаем эту проблему1' :  transaction}
                                </>
                            ) : ( error ? 'Произошла ошибка, но мы решаем эту проблему2' : ( 
                                <div className='w-full h-full flex justify-center  items-center'>
                                     <Spinner/>
                                </div>) ) }

            <div className="flex justify-center items-center">
                <Pagination totalItem={dataFilter?.length} 
                            itemPerPage={itemPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}/>
            </div>
        </div>
    )
}

export const Transactions = observer(TransactionsComponent)
