import uniqid from 'uniqid'


interface Props  {
  setTypeButtonCharts: (button: string) => void
  typeButtonCharts: string
  isPairs: boolean
  namePairsOne?: string
  namePairsTwo?: string
}

export const ButtonsCharts = ({setTypeButtonCharts, typeButtonCharts, isPairs, namePairsOne, namePairsTwo}: Props) => {
 
  const styleButton = 'whitespace-nowrap mr-2 border-2 border-spacing-2 px-2 rounded-lg hover:text-slate-200 border-violet-500 hover:border-slate-200 active:text-violet-500 active:border-violet-500'

  const buttons = isPairs ? ['Liquidity', 'Volume', `${namePairsOne}-${namePairsTwo}`, `${namePairsTwo}-${namePairsOne}`] : ['Liquidity', 'Volume', 'Price']

  const ButtonsComponent = buttons.map((button)=>{
      return (
        <button key={uniqid()} className={button !==typeButtonCharts ? styleButton : `${styleButton} text-slate-200 border-slate-200 ring-4`}  onClick={()=>{setTypeButtonCharts(button)}}>{button}</button>
      )
  })

  return (
    <div className='flex text-xs'>
      {ButtonsComponent}
    </div>

  )
}

