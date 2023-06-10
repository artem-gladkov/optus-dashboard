import {observer} from 'mobx-react-lite'
import { useCopyClick } from '../../hooks/useCopyClick';
import { CopyClick, CopyClickSuccess } from '../svg/Icon';

interface Props {
    name: string;
    symbol: string;
    address: string;
}

const TokenInformationComponent = ({name, symbol, address}: Props) => {

    const {isCopied, copy} =useCopyClick()

    return (
        <div className='flex  w-full mt-4 mb-10 p-4 border rounded-2xl'>
            <div className='flex md:w-1/2 w-full flex-col md:flex-row' >
                <div className='md:w-1/3 w-full flex md:block justify-between md:justify-start'>
                    <p className='mb-2 w-1/2'>Symbol</p>   
                    <div className='font-medium w-1/2'>{symbol}</div>
                </div>
                <div className='md:w-1/3 w-full flex md:block justify-between  md:justify-start'>
                    <p className='mb-2 w-1/2'> Name</p>
                    <div className='font-medium w-1/2'>{name}</div>
                </div>
                <div className='md:w-1/3 w-full flex md:block justify-between  md:justify-start'>
                    <p className='mb-2 w-1/2'>Address</p> 
                    <div className='flex  items-center w-1/2'>
                        <div className='font-medium mr-3'>{address.slice(0,4)+'...'+ address.slice(-4)}</div>
                        <button onClick={()=>{copy(address)}}>{!isCopied ? <CopyClick/> : <CopyClickSuccess/>}</button>
                    </div>
                    
                </div>
            </div>
        </div>
            
    )
}

export const TokenInformation = observer(TokenInformationComponent)
