import { store } from '../../Store/store'
import uniqid from 'uniqid'

interface Props {
    active: any;
    children: React.ReactNode;
    type: string;
    flagTransaction?: boolean;
    data?: any;
    flagTokens?: boolean;


}

const Button = ( {active, children, type, flagTransaction, data, flagTokens}: Props, ) => {

const {updateActiveButton, sortTransactions, updateActiveButtonHeader , arrow, activeButtonHeader} = store

const Arrownone = () => {
    if(active && arrow === 'high' && activeButtonHeader !== 'Account') {return (<span key={uniqid()}>&dArr;</span>)}
    if(active && arrow === 'low' && activeButtonHeader !== 'Account') {return (<span key={uniqid()}>&uArr;</span>)}
    if(!active && activeButtonHeader !== 'Account') {return (<span key={uniqid()}></span>)}
}    


const style = active ? "text-slate-50 hover:text-slate-50 flex" : "hover:text-slate-50 flex"


const TransButtonORHeaderComponent = (flagTransaction: boolean)=>{
   
    if(flagTransaction){return ()=> {updateActiveButton(type)}}
    if(!flagTransaction){return ()=> {
        sortTransactions(type, data)
        updateActiveButtonHeader(type)
    }}


}
    return (
        <>
        {
            flagTransaction ? (       
                                    <div key={uniqid()} className='flex'>
                                            <button key={uniqid()}  
                                                    onClick={TransButtonORHeaderComponent(flagTransaction)} 
                                                    className={type=== "Account" ? '' : style}>
                                                {children}
                                            </button>
                                    </div> ) : (
                                             <button key={uniqid()}  
                                                    onClick={TransButtonORHeaderComponent(flagTransaction)} 
                                                    className={type=== "Account" ? '' : style}>
                                                    {children} {Arrownone()}
                                              </button>
                                     
                                    )}
        </>

    )
}

export default Button
