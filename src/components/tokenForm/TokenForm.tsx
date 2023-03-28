import {observer} from 'mobx-react-lite'
import { numberColor } from '../../function/colorChanges';
import { numberWithSpaces } from '../../function/numberWithSpaces';

interface Props {
    title:string;
    value: number;
    change: number;
    transaction?: boolean;
}

const TokenFormComponent = ({title, value, change, transaction = false}: Props) => {
    return (
(        <div className="flex flex-col bg-form rounded-2xl p-4 mb-2">
            <div className='mb-5'><h3>{title}</h3></div>
                <div className='flex justify-between'>
                    <div className='text-2xl'>{numberWithSpaces(value)} {transaction ?  '' : '$'}</div>
                    <div className={`${numberColor(change)} font-bold`}>{change}%</div>    
                </div> 
        </div>)
    )
}

export const TokenForm = observer(TokenFormComponent)
