import { store } from '../../Store/store'
import uniqid from 'uniqid'
import { Link } from 'react-router-dom';

interface Props {
    active?: any;
    type: 'tokens' | 'pairs' | 'transactions' | 'filter_transactions' | 'buttonDex' | 'dexoverview';
    flagTransaction?: boolean;
    data?: any;
    flagTokens?: boolean;
    arrButtons: string[] | {id:string, name: string}[];
    page?: string;
   

}

export const ButtonTokens = ( {active, type, data, arrButtons, page}: Props, ) => {

const {
    arrow, 
    updateActiveButtonTokens, 
    sortTokens,
    updateArrow,  
     updateActiveButtonPairs, 
    sortPairs,updateActiveButtonTransaction, sortTransactions,
    updateFilterButton,
    updateActiveButtonDex,
    updateHandlerButtonDexBo
} = store

    const a = typeof window.location.pathname.split('/')[3] == 'undefined' ? '' : `/${window.location.pathname.split('/')[3]}`
    const Arrownone = (button) => {
        if(button === active && arrow === 'high' && button !== 'Account' && button !== 'Liquidity Jettons' && type !== "filter_transactions" ) {return (<span key={uniqid()}>&dArr;</span>)}
        if(button === active && arrow === 'low' && button !== 'Account'  && button !== 'Liquidity Jettons'  && type !== "filter_transactions") {return (<span key={uniqid()}>&uArr;</span>)}

        return 
    }    

    let style = "text-text md:w-1/5 w-1/3 font-medium flex justify-center md:justify-start"
    let stylePages = 'w-1/3 justify-center xl:w-1/5 xl:justify-start text-inActive'

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
        if(type === 'buttonDex'){
            if(button !== 'overview'){
                updateActiveButtonDex(button)
                updateHandlerButtonDexBo(true)
            }

        }

    }


    return (

        <>
        {arrButtons.map((button)=>{ 
         if(type === 'buttonDex') {
            return (
                <div key={uniqid()} onClick={()=>{ButtonHeaderComponent(button.name)}} >
                    <Link to={`overview/${button.name}${page === '' ? '' : '/'}${page === '' ? a : page}`}> {button.name} </Link>
                </div>
            )
         } else if(type === 'pairs') {
            return (
                <button key={uniqid()}  
                        onClick={()=>{ButtonHeaderComponent(button)}} 
                        className={`${stylePages} font-medium flex ${button === active ? 'text-text' : 'hover:text-inActive'}` }>
                                {button} {Arrownone(button)}                   
                </button>)
         } else {
            return (
                <button key={uniqid()}  
                        onClick={()=>{ButtonHeaderComponent(button)}} 
                        className={button === active ?  style :  `text-inActive md:w-1/5 w-1/3 hover:text-inActive flex justify-center md:justify-start` }>
                                {button} {Arrownone(button)}       
                </button>)
         }
        })}
        </>
    )
}

