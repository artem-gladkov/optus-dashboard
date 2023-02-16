import {observer} from 'mobx-react-lite'

interface Props {
    title:string;
    value: number;
    change: number;
}

const TokenFormComponent = ({title, value, change}: Props) => {
    return (
        <div className="flex flex-col bg-cyan-700 bg-opacity-40 rounded-2xl p-6 mb-2">
            <div className='mb-5'><h3>{title}</h3></div>
                <div className='flex justify-between'>
                    <div className='text-2xl'>{value} $</div>
                    <div>{change}%</div>    
                </div> 
        </div>
    )
}

export const TokenForm = observer(TokenFormComponent)
