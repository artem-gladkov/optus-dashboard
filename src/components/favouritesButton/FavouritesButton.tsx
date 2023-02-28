import { store } from "../../Store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"


interface Props  {
    symbol:string;
    address: string;
}

const FavouritesButton = observer (({symbol, address}: Props) => {
   

    const {getFooterState,addLocalStorageSTORE, removeLocalStoreSTORE,footerUpdate,updatebuttonFavoritesFlag,buttonFavoritesFlag} = store

    const addLocalStorage =() => {
        if(!buttonFavoritesFlag){
            updatebuttonFavoritesFlag()
            addLocalStorageSTORE(symbol, address)
            footerUpdate()
        } 

        if(buttonFavoritesFlag){
            updatebuttonFavoritesFlag()
            removeLocalStoreSTORE(symbol)
            footerUpdate()
        }

    } 

    useEffect(()=>{
        console.log('1111')
    },[getFooterState])
    console.log('2222')
    return (
        <button onClick={addLocalStorage}>
            {  localStorage.getItem(symbol) ? 'Добавлено в избранное!' : 'Добавить???' }
        </button>
    )
})

export default FavouritesButton