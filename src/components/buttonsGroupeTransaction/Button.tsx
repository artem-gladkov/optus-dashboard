import { store } from '../../Store/store'

interface Props {
    active: any;
    children: any;
    type: string;
}

const Button = ( {active, children, type}: Props, ) => {

const style = active ? "text-slate-50 hover:text-slate-50 flex" : "hover:text-slate-50 flex"
const {updateActiveButton} = store

    return (
       <div className='flex'>
            <button  onClick={()=>{updateActiveButton(type)}} className={style}>
                {children}
            </button>
       </div> 

    )
}

export default Button
