import {observer} from 'mobx-react-lite'


interface Props {
    name: string;
    symbol: string;
    address: string;
}

const TokenInformationComponent = ({name, symbol, address}: Props) => {
    return (
        <div className='flex w-full mt-4 mb-10 p-4 border rounded-2xl'>
            <div className='flex w-1/2' >
                <div className='w-1/3'>
                    <p className='mb-2'>Symbol</p>   
                    <div className='font-medium'>{symbol}</div>
                </div>
                <div className='w-1/3'>
                    <p className='mb-2'> Name</p>
                    <div className='font-medium'>{name}</div>
                </div>
                <div className='w-1/3'>
                    <p className='mb-2'>Address</p> 
                    <div className='font-medium'>{address}</div>
                </div>
            </div>
        </div>
            
    )
}

export const TokenInformation = observer(TokenInformationComponent)
