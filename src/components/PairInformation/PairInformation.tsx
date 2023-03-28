import {observer} from 'mobx-react-lite'


interface Props {
    pairname: string;
    pairAddress: string;
    DAIaddress: string;
    USDCAddress: string;
}

const PairInformationComponent = ({pairname, pairAddress, DAIaddress, USDCAddress}: Props) => {
    return (
        <div className='flex w-full mt-4 mb-10 p-4 border rounded-2xl'>
            <div className='flex w-full md:w-5/6 text-base flex-col md:flex-row' >
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2 '>Pair Name</p>   
                    <div className='font-medium'>{pairname}</div>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'> Pair Address</p>
                    <div className='font-medium'>{`${pairAddress.slice(0,4)}...${pairAddress.slice(-4)}`}</div>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'>DAI Address</p> 
                    <div className='font-medium'>{DAIaddress}</div>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'>USDC Address</p> 
                    <div className='font-medium'>{USDCAddress}</div>
                </div>
            </div>
        </div>
            
    )
}

export const PairInformation = observer(PairInformationComponent)
