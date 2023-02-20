import { store } from '../../Store/store'
import { useState } from 'react';
import uniqid from 'uniqid'

interface Props {
    active: any;
    children: any;
    type: string;
    flagTransaction: boolean;
    data?: any


}

const Button = ( {active, children, type, flagTransaction, data}: Props, ) => {

const {updateActiveButton, sortTransactions, updateToggleSort, updateActiveButtonHeader , arrow, activeButtonHeader} = store

const Arrownone = () => {
    if(active && arrow === 'high' && activeButtonHeader !== 'Account') {return (<span key={uniqid()}>&dArr;</span>)}
    if(active && arrow === 'low' && activeButtonHeader !== 'Account') {return (<span key={uniqid()}>&uArr;</span>)}
    if(!active && activeButtonHeader !== 'Account') {return (<span key={uniqid()}></span>)}
}    


const style = active ? "text-slate-50 hover:text-slate-50 flex" : "hover:text-slate-50 flex"
console.log(type)


const TransButtonORHeaderComponent = (flagTransaction: boolean)=>{
    if(flagTransaction){return ()=> {updateActiveButton(type)}}
    if(!flagTransaction){return ()=> {
        updateToggleSort()
        sortTransactions(type, data)
        updateActiveButtonHeader(type)
    }
}
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
