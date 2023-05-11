/* eslint-disable array-callback-return */
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { store } from "../../Store/store";
import uniqid from 'uniqid'
import { useEffect, useState } from "react";
import { Pagination } from "../pagination/Pagination";
import {ButtonTokens} from "../buttonsGroupe/ButtonGroupeForm"
import Spinner from "../spinner/Spinner";
import useMedia from "../../hooks/useMedia";

interface Props {
    data: any;
    address?: string;
    error: boolean
}

const TransactionsComponent = ({data, address, error}: Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemPerPage, setItemPerPage] = useState(8)

    const matches = useMedia("(min-width: 1224px)")
    const matches2 = useMedia("(min-width: 1024px)")

    const {buttonFilterTransaction, 
        buttonTransactions, 
        activeButtonTransactions, 
        activeButtonFilter, 
        activeButtonDex
     } = store
     const [handleButtonTypeTransaction, setHandleButtonTypeTransaction] = useState(false)

     useEffect(()=>{},[activeButtonDex])


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
            <div key={uniqid()} className="flex w-full justify-between p-4 border-b border-inActive border-opacity-20 text-xs sm:text-base">
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
                        <div  className="flex lg:w-1/5 w-1/2 justify-center lg:justify-start"><span>{trans.usd_amount.value} $</span></div>
                        <div  className="lg:flex lg:w-1/5 hidden"><span>{trans.symbol_one_amount.value} {trans.symbol_one.symbol}</span></div>
                        <div  className="lg:flex lg:w-1/5 hidden"><span>{trans?.symbol_two_amount?.value} {trans?.symbol_two?.symbol}</span></div>
                        <div  className="lg:flex lg:w-1/5 hidden">
                            <Link to={`https://tonapi.io/account/${trans.account}`} target="_blank">
                                <span className="font-medium text-slate-900 text-opacity-80 hover:text-slate-50 ">
                                    {`${trans.account.slice(0,4)}...${trans.account.slice(-4)}`}
                                </span>
                            </Link> 
                        </div>
                        <div  className="flex  whitespace-nowrap lg:w-1/5 w-1/2 justify-center lg:justify-start"><span>{trans.time_ago}</span></div>
                    </div>
            </div>
        )
    })


 return (
        <div key={uniqid()} className="w-full border rounded-2xl mt-4 bg-form border-inActive text-xs sm:text-base">
            <div className="flex  w-full  p-4 border-b border-inActive border-opacity-60">
                <div  className="w-1/3"> 
                {matches ? (
                                    <div className="flex justify-between w-1/2">
                                        <ButtonTokens arrButtons={buttonFilterTransaction} data={data} key={uniqid()}  active = {activeButtonFilter} type='filter_transactions'/>
                                    </div>
                ) : (   <div>
                            <button className="border h-7 w-24 rounded flex justify-around items-center" 
                                    onClick={()=>setHandleButtonTypeTransaction((v)=>!v)}>{activeButtonFilter}
                                    <div className="rotate-90 text-xl">&#8250;</div>
                            </button>
                            {handleButtonTypeTransaction ? (
                                <div className="absolute bg-form border rounded-md w-24 flex flex-col items-center">
                                            <ButtonTokens arrButtons={buttonFilterTransaction} data={data} key={uniqid()}  active = {activeButtonFilter} type='filter_transactions'/>
                                </div>
                            ): (null)}
                         </div>

                ) }

                </div>
                <div className="flex w-2/3 text-xs sm:text-base justify-around lg:justify-start">
                    <ButtonTokens arrButtons={matches2 ? buttonTransactions : ['Total Value', 'Time']} data={data} key={uniqid()}  active = {activeButtonTransactions} type='transactions'/>
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
