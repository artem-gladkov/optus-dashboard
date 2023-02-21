import { store } from '../../Store/store'
import uniqid from 'uniqid'

interface Props {
    active: any;
    children: any;
    type: string;
    flagTransaction?: boolean;
    data?: any;
    flagTokens?: boolean;


}

const ButtonTokens = ( {active, children, type, data}: Props, ) => {

const {arrow, updateActiveButtonTokens, sortTokens} = store

const Arrownone = () => {
    if(active && arrow === 'high') {return (<span key={uniqid()}>&dArr;</span>)}
    if(active && arrow === 'low') {return (<span key={uniqid()}>&uArr;</span>)}
}    


const style = active ? "text-slate-50 hover:text-slate-50 flex" : "hover:text-slate-50 flex"


const ButtonHeaderComponent = ()=>{
    updateActiveButtonTokens(type)
    sortTokens(type, data)
}
    return (
       <button key={uniqid()}  
            onClick={ButtonHeaderComponent} 
            className={style}>
            {children} {Arrownone()}
        </button>
 

    )
}

export default ButtonTokens
