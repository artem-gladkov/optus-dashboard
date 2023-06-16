import { observer } from 'mobx-react'
import { ChartsOverview } from '../components/charts/ChartsOverview'
import { Analitics } from '../components/charts/ChartsAnalitics'

interface Props {
    
}

export const TonAnalitics = observer((props: Props) => {
    return (
        <div className='flex flex-col w-full h-full mt-14'>

            <div className='flex'>
                <div className='flex w-1/2 h-96 justify-center items-center'>
                    <span><Analitics/></span>
                </div>
                <div className='flex w-1/2 h-96 justify-center items-center'>
                    <span>Верхний левый график</span> 
                </div>
            </div>

            <div className='flex'>
                <div className='flex w-1/2 h-96 justify-center items-center'>
                    <span>Нижний правый график</span> 
                </div>
                <div className='flex w-1/2 h-96 justify-center items-center'>
                    <span>Нижний левый график</span> 
                </div>
            </div>      
        </div>
    )
})

