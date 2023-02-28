/* eslint-disable array-callback-return */
import { toJS } from "mobx";
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { store } from "../../Store/store";
import Button from "../buttonsGroupe/ButtonTransaction";
import uniqid from 'uniqid'
import { useState } from "react";
import { Pagination } from "../pagination/Pagination";

interface Props {
    data: any;
}

const TransactionsComponent = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(8)


    const {data} = props
    const {buttonType, buttonTransactions} = store



    const ButtonGroupeTransaction = buttonType.map((type, index)=>{
            return (
            <Button key={uniqid()}  type ={type} active = {store.activeButton === type} flagTransaction={true} >
                {type}
            </Button>)
    })

    const ButtonHeaderTransaction = buttonTransactions.map((type, index)=>{
        return (
                    <div key={uniqid()} className="flex w-1/5">
                        <Button data ={data} key = {uniqid()} type ={type} active = {store.activeButtonHeader === type} flagTransaction={false} >
                            {type}
                        </Button> 
                    </div>
    )
    })
    
    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    const dataFilter = data?.filter((trans: { type: string; }) => {
        if(store.activeButton === 'All'){return trans}
        if(store.activeButton === 'Swaps'){return trans?.type === 'swap'}
        if(store.activeButton === 'Adds'){return trans?.type === 'add'}
        if(store.activeButton === 'Removes'){return trans?.type === 'remove'}
    })


    const transaction = dataFilter?.slice(firstItemIndex, lastItemIndex)
        .map((trans, index)=>{
        return (
            <div key={uniqid()} className="flex w-full justify-between text-base p-4 border-b border-gray-50 border-opacity-20">
                    <div  className="w-1/3">
                        <div  className="flex items-center">
                            <span className="mr-3"> 
                                {/* должен быть номер по счёту транзакции */}
                            </span>
                            <Link  to={`https://tonapi.io/transaction/${trans.hash}`} target="_blank">
                                <span className=" font-medium text-slate-900 text-opacity-80 hover:text-slate-50 ">
                                    {trans.type} {trans?.symbol_one?.symbol} for {trans?.symbol_two?.symbol}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div  className="flex w-2/3 ">
                        <div  className="flex w-1/5"><span>{trans.usd_amount.value} $</span></div>
                        <div  className="flex w-1/5"><span>{trans.symbol_one_amount.value} {trans.symbol_one.symbol}</span></div>
                        <div  className="flex w-1/5"><span>{trans?.symbol_two_amount?.value} {trans?.symbol_two?.symbol}</span></div>
                        <div  className="flex w-1/5"><span>Account</span></div>
                        <div  className="flex  whitespace-nowrap w-1/5"><span>{waiting(trans.timestamp)}</span></div>
                    </div>
            </div>
        )
    })


 return (
        <div key={uniqid()} className="w-full h-full border rounded-2xl mt-4 ">
            <div className="flex  w-full  p-4 border-b border-gray-50 border-opacity-60">
                <div  className="w-1/3"> 
                    <div className="flex justify-between w-2/3">
                        {ButtonGroupeTransaction}
                    </div>
                </div>

                <div  className="flex w-2/3">
                    {ButtonHeaderTransaction    }                
                </div>
            </div>
                    {transaction}

            <div className="flex justify-center items-center">
                <Pagination totalItem={dataFilter?.length} 
                            itemPerPage={itemPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}/>
            </div>
        </div>
    )
}

function waiting(t: number) {
   const years = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12));
   const months = Math.floor(t / (1000 * 60 * 60 * 24 * 30) % 12);
   const days = Math.floor(t / (1000 * 60 * 60 * 24) % 30);
   const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
   const minutes = Math.floor((t / (1000 * 60)) % 60);
   const seconds = Math.floor((t / 1000) % 60);
   const furstIndex: number[] = []
   const mass =  [years, months, days, hours, minutes, seconds]
   
    mass.forEach((el, index)=>{
    if(el>0){furstIndex.push(index)}
   })
   
   if(furstIndex[0] === 0){return `${years} years ago`}
   if(furstIndex[0] === 1){return `${months} months ago`} 
   if(furstIndex[0] === 2){return `${days} days ago`} 
   if(furstIndex[0] === 3){return `${hours} hours ago`} 
   if(furstIndex[0] === 4){return `${minutes} minutes ago`} 
   if(furstIndex[0] === 5){return `${seconds} seconds ago`}  
}



export const Transactions = observer(TransactionsComponent)
