import {observer} from 'mobx-react-lite'
import { Link } from 'react-router-dom';
import { useCopyClick } from '../../hooks/useCopyClick';
import { CopyClick, CopyClickSuccess } from '../svg/Icon';

interface Props {
    pairname: string;
    pairAddress: string;
    tokenOneAddress: string;
    tokenTwoAddress: string;
    tokenOneSymbol: string;
    tokenTwoSymbol: string;
    
}

const PairInformationComponent = ({pairname, pairAddress, tokenOneAddress, tokenTwoAddress,tokenOneSymbol, tokenTwoSymbol}: Props) => {
    const {isCopied: one, copy: copyOne} =useCopyClick()
    const {isCopied: two, copy: copyTwo} =useCopyClick()
    const {isCopied: pair, copy: copyPair} =useCopyClick()
    const copyPairAdress = (text) =>{
        copyPair(text)
    }
    const copyTokenOne = (text) =>{
        copyOne(text)
    }
    const copyTokenTwo = (text) =>{
        copyTwo(text)
    }
    return (
        <div className='flex w-full mt-4 mb-10 p-4 border rounded-2xl'>
            <div className='flex w-full md:w-5/6 text-base flex-col md:flex-row' >
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2 '>Pair Name</p>   
                    <div className='font-medium'>{pairname}</div>
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'> Pair Address</p>
                    <div className='flex items-center'>
                        <Link to={`https://tonapi.io/account/${pairAddress}`} target="_blank">
                            <div className='font-medium mr-2'>{`${pairAddress.slice(0,4)}...${pairAddress.slice(-4)}`}</div>
                        </Link>
                        <button onClick={()=>{copyPairAdress(pairAddress)}}>{!pair ? <CopyClick/> : <CopyClickSuccess/>}</button>
                    </div>

                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'>{tokenOneSymbol} Address</p>
                    <div className='flex items-center'>
                        <Link to={`https://tonapi.io/account/${tokenOneAddress}`} target="_blank">
                            <div className='font-medium mr-2'>{`${tokenOneAddress.slice(0,4)}...${tokenOneAddress.slice(-4)}`}</div>
                        </Link>
                        <button onClick={()=>{copyTokenOne(tokenOneAddress)}}>{!one ? <CopyClick/> : <CopyClickSuccess/>}</button>
                    </div> 
                </div>
                <div className='md:w-1/4 w-full flex md:block'>
                    <p className='mb-2 w-1/2'>{tokenTwoSymbol} Address</p> 
                    <div className='flex items-center'>
                        <Link to={`https://tonapi.io/account/${tokenTwoAddress}`} target="_blank">
                            <div className='font-medium mr-2'>{`${tokenTwoAddress.slice(0,4)}...${tokenTwoAddress.slice(-4)}`}</div>
                        </Link>
                        <button onClick={()=>{copyTokenTwo(tokenTwoAddress)}}>{!two ? <CopyClick/> : <CopyClickSuccess/>}</button>
                    </div>
                </div>
            </div>
        </div>
            
    )
}

export const PairInformation = observer(PairInformationComponent)
