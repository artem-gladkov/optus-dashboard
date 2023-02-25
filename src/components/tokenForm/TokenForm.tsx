import {observer} from 'mobx-react-lite'

interface Props {
    title:string;
    value: number;
    change: number;
    transaction?: boolean;
}

const TokenFormComponent = ({title, value, change, transaction = false}: Props) => {
    return (
        <div className="flex flex-col bg-green-200 bg-opacity-20 rounded-2xl p-4 mb-2">
            <div className='mb-5'><h3>{title}</h3></div>
                <div className='flex justify-between'>
                    <div className='text-2xl'>{value} {transaction ?  '' : '$'}</div>
                    <div>{change}%</div>    
                </div> 
        </div>
    )
}

export const TokenForm = observer(TokenFormComponent)
