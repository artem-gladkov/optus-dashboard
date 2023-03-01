import { store } from '../../Store/store'
import uniqid from 'uniqid'

interface Props {
    active?: any;
    type: 'tokens' | 'pairs' | 'transactions' | 'filter_transactions';
    flagTransaction?: boolean;
    data?: any;
    flagTokens?: boolean;
    arrButtons: string[]


}

export const ButtonTokens = ( {active, type, data, arrButtons}: Props, ) => {

const {arrow, updateActiveButtonTokens, 
    sortTokens,
    updateArrow,  
     updateActiveButtonPairs, 
    sortPairs,updateActiveButtonTransaction, sortTransactions,
    updateFilterButton} = store

const Arrownone = (button) => {
    if(button === active && arrow === 'high' && button !== 'Account' && type !== "filter_transactions" ) {return (<span key={uniqid()}>&dArr;</span>)}
    if(button === active && arrow === 'low' && button !== 'Account'  && type !== "filter_transactions") {return (<span key={uniqid()}>&uArr;</span>)}
    return ''
}    


const style = "w-1/5 text-slate-50 hover:text-slate-50 flex"  


 const ButtonHeaderComponent = (button: string)=>{
    if(type === "tokens"){
        updateActiveButtonTokens(button)
        sortTokens(button, data)
        updateArrow()
    }
    if(type === "pairs") {
        updateActiveButtonPairs(button)
        sortPairs(button, data)
        updateArrow()
    }
    if(type === "transactions"){
        updateActiveButtonTransaction(button)
        sortTransactions(button, data)
        updateArrow()
    }
    if(type === "filter_transactions" ){
        updateFilterButton(button)
    }

}


    return (

        <>
        {arrButtons.map((button)=>{ 
            
            return (
            
            <button key={uniqid()}  
                    onClick={()=>{ButtonHeaderComponent(button)}} 
                    className={button === active ? style : "w-1/5 hover:text-slate-50 flex" }>
                   {button} {Arrownone(button)}
            </button>)

        })}
        </>
    )
}

