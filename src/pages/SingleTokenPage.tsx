import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { store } from "../Store/store"
import { toJS } from "mobx"

interface Props {
    
}

const SingleTokenPageComponent = (props: Props) => {

    const {address} = useParams()

    useEffect(()=>{
        if(address){
            store.singleTokenApi(address, 'day')
        }

    }, [address])

    console.log(toJS(store.getSingleToken))

    return (
        <div className="flex w-full h-full flex-col">
            <div className="flex justify-around w-full  flex-wrap  items-center my-5">
                    <h2 className="flex text-3xl font-medium">{address}</h2>
                    <input type="text" className="inputSearch h-6" />
            </div>

        </div>

    )
}

export const SingleTokenPage = observer(SingleTokenPageComponent)
