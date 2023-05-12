import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import uniqid from 'uniqid'
import {ButtonTokens} from "../buttonsGroupe/ButtonGroupeForm"
import { Pagination } from "../pagination/Pagination";
import { numberWithSpaces } from "../../function/numberWithSpaces"
import { numberColor } from "../../function/colorChanges"
import Spinner from "../spinner/Spinner"
import useMedia from "../../hooks/useMedia"

interface Props {
    
}

const TokensComponent = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemPerPage, setItemPerPage] = useState(8)
    const {buttonTokens,tokensApi, activeButtonTokens,getTokens, getErrorTokens, activeButtonDex, updateHandlerButtonDexBo} = store; 
    const matches = useMedia("(min-width: 768px)")

    
    const {dex} = useParams()

    // console.log(toJS(getTokens))

    useEffect(()=>{
        tokensApi(dex)
        console.log('render tokens')
        updateHandlerButtonDexBo(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[activeButtonDex])

    const lastItemIndex = currentPage * itemPerPage;
    let firstItemIndex = lastItemIndex - itemPerPage;
    let idx = firstItemIndex+1
    const tokens = getTokens?.slice(firstItemIndex, lastItemIndex)
                                  .map((token: any, index:number)=>{
                                        return (
                                            <div key={uniqid()} className="flex w-full justify-between p-4 border-b border-inActive border-opacity-20">
                                                    <div className="lg:w-1/3 hidden lg:block">
                                                        <div className="flex items-center ">
                                                            <span className="mr-3"> {idx++}</span>
                                                            <img className="mr-3" src={token.icon} alt="imgToken" style={{width: 20, height: 20}}/>
                                                            <Link  to={`/${dex || 'STON.fi'}/tokens/${token.address}`}>   
                                                                <span className="font-medium  text-opacity-80  ">{token.name}</span>
                                                                <span className="text-inActive ml-2">({token.symbol})</span> 
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="flex lg:w-2/3 w-full text-xs sm:text-base font-medium">
                                                            <div className="flex md:w-1/5 w-1/3">
                                                            <img className="mr-3 lg:hidden" src={token.icon} alt="imgToken" style={{width: 20, height: 20}}/>
                                                                <Link to={`/${dex}/tokens/${token.address}`}>
                                                                    {token.symbol}
                                                                </Link>
                                                            </div>
                                                            <div className="flex md:w-1/5 w-1/3  justify-center md:justify-start"><span>{numberWithSpaces(token.liquidity.value) } $</span></div>
                                                            <div className="flex md:w-1/5 w-1/3  justify-center md:justify-start"><span>{token.native_liquidity.value } </span></div>
                                                            <div className="flex md:w-1/5 w-1/3 px-2 justify-center  md:justify-start"><span>{token.volume_24h.value} $</span></div>
                                                            <div className="md:flex md:w-1/5 hidden  md:flex-row justify-center  md:justify-start"><span className="flex">{token.current_usd_price.value} $</span></div>
                                                            <div className={`md:flex md:w-1/5 hidden  md:flex-row justify-end  md:justify-start ${numberColor(token.current_usd_price.change)}`}><span className="flex">{token.current_usd_price.change} %</span></div>  
  
                                                     </div>
                                            </div>
                                        )
                                })

    return (
        <div className="w-full border rounded-2xl mt-4 bg-form border-inActive text-xs sm:text-base">
            <div className="flex  w-full  p-4 border-b border-inActive border-opacity-60">
                <div  className="lg:w-1/3 hidden lg:flex"> 
                    <div>Name</div>
                </div>

                <div className="flex lg:w-2/3 w-full break-all">
                   <ButtonTokens arrButtons={!matches ? ['Symbol', 'Liquidity $', 'Liquidity Jettons', 'Volume (24hrs)'] : buttonTokens} 
                                    data={getTokens} key={uniqid()}  
                                    active = {activeButtonTokens} 
                                    type='tokens'/>
                </div>

            </div>
           
            {getTokens.length ? (
                <>
                    {!getErrorTokens ? tokens : 'Произошла ошибка, но мы решаем эту проблему'}
                </>
            ) : ( getErrorTokens ? 'Произошла ошибка, но мы решаем эту проблему' : ( 
                                        <div className='w-full h-full flex justify-center  items-center'>
                                             <Spinner/>
                                        </div>)) }
          

            <div className="flex justify-center items-center">
                <Pagination totalItem={store.getTokens.length} 
                            itemPerPage={itemPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}/>
            </div>
        </div>
    )
}


export const Tokens = observer(TokensComponent)


