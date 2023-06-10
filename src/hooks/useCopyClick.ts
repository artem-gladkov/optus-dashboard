import {useState, useCallback, useEffect} from 'react'
import { ErrorBar } from 'recharts'



export const UseCopyClick = () => {
    const [isCopied, setIsCopied] = useState(false)
    
    const copy = useCallback((text)=>{
        navigator.clipboard
        .writeText(text)
        .then(()=>{setIsCopied(true)})
        .catch( err => {
            console.error('Unable to copy text', ErrorBar)
        })
                        
    },[])

    useEffect(()=>{
        if(isCopied){
            const timer = setTimeout(()=>{
                setIsCopied(false)
            }, 1500)
            return ()=>{clearTimeout(timer)}
        }
    },[isCopied])

    return {isCopied, copy}
}

