import { store } from '../../Store/store'
import uniqid from 'uniqid'
import { toJS } from 'mobx';

interface Props {
    active?: any;
    type: 'tokens' | 'pairs' | 'transactions';
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
    sortPairs,updateActiveButton, sortTransactions,} = store

const Arrownone = (button) => {
    if(button === active && arrow === 'high') {return (<span key={uniqid()}>&dArr;</span>)}
    if(button === active && arrow === 'low') {return (<span key={uniqid()}>&uArr;</span>)}
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
        updateActiveButton(button)
        sortTransactions(button, data)
        updateArrow()
    }

}


    return (

        <>
        {arrButtons.map((button)=>{ return (
            
            <button key={uniqid()}  
                    onClick={()=>{ButtonHeaderComponent(button)}} 
                    className={button === active ? style : "w-1/5 hover:text-slate-50 flex" }>
                   {button} {Arrownone(button)}
            </button>)

        })}
        </>
    )
}

