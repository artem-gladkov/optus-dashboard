import { toJS } from "mobx";
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { store } from "../../Store/store";
import Button from "../buttonsGroupeTransaction/Button";


interface Props {
    data: any;
}

const TransactionsComponent = (props: Props) => {

const {data} = props
const {buttonType} = store

console.log(toJS(data))


const ButtonGroupeComponent = buttonType.map((type)=>{
        return (<Button key={type} type ={type} active = {store.activeButton === type}>{type}</Button>)
})



const transaction = data?.filter((trans: { type: string; })=>{
    if(store.activeButton === 'All'){return trans}
    if(store.activeButton === 'Swaps'){return trans.type === 'swap'}
    if(store.activeButton === 'Swaps'){return trans.type === 'add'}
    if(store.activeButton === 'Swaps'){return trans.type === 'remove'}
})
    .map((trans: any, index: number)=>{
    return (
        <div key={index} className="flex w-full justify-between text-base p-4 border-b border-gray-50 border-opacity-20">
                <div className="w-1/3">
                    <div className="flex items-center">
                        <span className="mr-3"> 
                            {index+1}
                        </span>
                        <Link to={`https://tonapi.io/transaction/${trans.hash}`}>
                            <span className=" font-medium text-slate-900 text-opacity-80 hover:text-slate-50 ">
                                {trans.type} {trans.symbol_one.symbol} for {trans.symbol_two.symbol}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="flex w-1/3 ">
                    <div className="flex w-1/3"><span>{trans.usd_amount.value} $</span></div>
                    <div className="flex w-1/3"><span>{trans.symbol_one_amount.value} {trans.symbol_one.symbol}</span></div>
                    <div className="flex w-1/3"><span>{trans.symbol_two_amount.value} {trans.symbol_two.symbol}</span></div>
                </div>
                <div className="flex w-1/3">
                    <div className="flex w-full  ">
                        <div className="flex  w-1/2 justify-center"><span className="flex">Account</span></div>
                        <div className="flex  whitespace-nowrap w-1/2"><span>{waiting(trans.timestamp)}</span></div>
                    </div>
                </div>
         </div>
    )
})


 return (
        <div className="w-full h-full border rounded-2xl mt-4 ">
            <div className="flex  w-full  p-4 border-b border-gray-50 border-opacity-60">
                <div  className="w-1/3"> 
                    <div className="flex justify-between w-1/2">
                        {ButtonGroupeComponent}
                    </div>
                </div>

                <div className="flex w-1/3 ">
                    <div className="flex w-1/3">Total Value &dArr;</div>
                    <div className="flex w-1/3">Token Amount</div>
                    <div className="flex w-1/3">Token Amount </div>
                </div>
                <div className="flex w-1/3 ">
                    <div className="flex w-full justify-center">
                        <div className="flex w-1/2 justify-center"><span className="flex ">Account</span> </div>
                        <div className="flex  whitespace-nowrap w-1/2">Time</div>
                    </div>
                </div>

            </div>
            {transaction}

            <div className="h-10"></div>
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
