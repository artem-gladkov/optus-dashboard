import {observer} from 'mobx-react-lite'
import { Link } from 'react-router-dom';


interface Props {
    pairname: string;
    pairAddress: string;
    tokenOneAddress: string;
    tokenTwoAddress: string;
    tokenOneSymbol: string;
    tokenTwoSymbol: string;
    
}

const PairInformationComponent = ({pairname, pairAddress, tokenOneAddress, tokenTwoAddress,tokenOneSymbol, tokenTwoSymbol}: Props) => {
    return (
        <div className='flex w-full mt-4 mb-10 p-4 border rounded-2xl'>
            <div className='flex w-full md:w-5/6 text-base flex-col md:flex-row' >
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2 '>Pair Name</p>   
                    <div className='font-medium'>{pairname}</div>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'> Pair Address</p>
                    <Link to={`https://tonapi.io/account/${pairAddress}`} target="_blank">
                        <div className='font-medium'>{`${pairAddress.slice(0,4)}...${pairAddress.slice(-4)}`}</div>
                    </Link>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'>{tokenOneSymbol} Address</p> 
                    <Link to={`https://tonapi.io/account/${tokenOneAddress}`} target="_blank">
                        <div className='font-medium'>{`${tokenOneAddress.slice(0,4)}...${tokenOneAddress.slice(-4)}`}</div>
                    </Link>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'>{tokenTwoSymbol} Address</p> 
                    <Link to={`https://tonapi.io/account/${tokenTwoAddress}`} target="_blank">
                        <div className='font-medium'>{`${tokenTwoAddress.slice(0,4)}...${tokenTwoAddress.slice(-4)}`}</div>
                    </Link>
                </div>
            </div>
        </div>
            
    )
}

export const PairInformation = observer(PairInformationComponent)
