import { makeAutoObservable, runInAction } from "mobx"



class StoreApp {
   private tokens = []
   private pairs = []
   private overview: any = {}
   private singleToken: any = {}
   private singlePair: any = {}

   public buttonFavoritesFlag: boolean = false;
   public footerState: any = []

   public buttonType: string[] = ['All', 'Swaps', 'Adds', 'Removes']
   public buttonTransactions: string[] = ['Total Value', 'Token Amount', 'Token Amount ', 'Account', 'Time']


   public buttonTokens: string[] = ['Symbol', 'Liquidity', 'Volume (24hrs)', 'Price', 'Price Change (24hrs)']
   public activeButtonTokens: string = this.buttonTokens[0]

   public buttonPairs: string[] = ['Liquidity', 'Volume (24hrs)', 'Volume (7d)', 'Fees (24hrs)', '1y Feels/Liquidity']
   public activeButtonPairs: string = this.buttonPairs[0]

   public activeButton: any = this.buttonType[0]
   public activeButtonHeader: any = this.buttonTransactions[0]

   public arrow: string = 'high'
   

    constructor(){
        makeAutoObservable(this)
    }

   tokensApi = async () => {
        const getTokens = await fetch('http://217.61.62.159:8001/api/v1/dashboard/top_tokens?limit=20')
        const respTokens = await getTokens.json()
        runInAction( ()=>{
            this.tokens =   respTokens
        })
    }

    pairsApi = async ()  => {
        const reqPairs = await fetch('http://217.61.62.159:8001/api/v1/dashboard/top_pairs?limit=20')
        const respPairs = await reqPairs.json()
        runInAction(()=>{
            this.pairs =  respPairs
        })
    }

    overviewApi = async(period: string) => {
        const reqOverview = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/overview?period=${period}&dex=STON.fi`)
        const respOverview = await reqOverview.json()
        runInAction(()=>{
            this.overview =  respOverview
        })
    }

    getTokenSingleApi = async (address:any, period:any) => {
        const reqToken = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/token?address=${address}&period=${period}&dex=STON.fi`)
        const resToken = await reqToken.json()
        runInAction(()=>{
            this.singleToken =  resToken
        })
    }

    getPairSingleApi = async (address:any, period:any) => {
        const reqPair = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/pair?address=${address}&period=${period}&dex=STON.fi`)
        const resPair = await reqPair.json()
        runInAction(()=>{
            this.singlePair =  resPair
        })
    }

    updateActiveButton = (type: string) => {
        this.activeButton = type
    }

    updateActiveButtonHeader = (type: string) => {
        this.activeButtonHeader = type
    }

    updateActiveButtonTokens = (type: string) => {
        this.activeButtonTokens = type
    }

    updateActiveButtonPairs = (type: string) => {
        this.activeButtonPairs = type
    }


    sortTransactions =(type:string, data: any[])=>{
        if(type ==='Total Value'){
            data.sort((a: { usd_amount: { value: number } },b: { usd_amount: { value: number } })=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.usd_amount.value - a.usd_amount.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.usd_amount.value - b.usd_amount.value}
            })
        }
        if(type ==='Token Amount'){
            data.sort((a: { symbol_one_amount: { value: number } },b: { symbol_one_amount: { value: number } })=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.symbol_one_amount.value - a.symbol_one_amount.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.symbol_one_amount.value - b.symbol_one_amount.value}
            })
        }
        if(type ==='Token Amount '){
            data.sort((a: { symbol_two_amount: { value: number } },b: { symbol_two_amount: { value: number } })=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.symbol_two_amount.value - a.symbol_two_amount.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.symbol_two_amount.value - b.symbol_two_amount.value}
            })
        }
        if(type ==='Time'){
            data.sort((a: { timestamp: number },b: { timestamp: number })=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.timestamp - a.timestamp}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.timestamp - b.timestamp}
            })
        }

    }

    sortTokens =(type:string, data: any[])=>{
        if(type ==='Symbol'){
            data.sort((a,b)=>{
                
                if(this.arrow === 'low'){ this.arrow = 'high'; return  a.symbol.symbol.localeCompare(b.symbol.symbol)}
                if(this.arrow === 'high'){this.arrow = 'low'; return b.symbol.symbol.localeCompare(a.symbol.symbol)}
            })
        }
        if(type ==='Liquidity'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.liquidity.value - a.liquidity.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.liquidity.value - b.liquidity.value}
            })
        }                    
        
        if(type ==='Volume (24hrs)'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.volume_24h.value - a.volume_24h.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.volume_24h.value - b.volume_24h.value}
            })
        }
        if(type ==='Price'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.current_usd_price.value - a.current_usd_price.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.current_usd_price.value - b.current_usd_price.value}
            })
        }
                if(type ==='Price Change (24hrs)'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.current_usd_price.change - a.current_usd_price.change}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.current_usd_price.change - b.current_usd_price.change}
            })
        }
    }

    sortPairs =(type:string, data: any[])=>{
        if(type ==='Liquidity'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.liquidity.value - a.liquidity.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.liquidity.value - b.liquidity.value}
            })
        }
        if(type ==='Volume (24hrs)'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.volume_24h.value - a.volume_24h.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.volume_24h.value - b.volume_24h.value}
            })
        }                    
        
        if(type ==='Volume (7d)'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.volume_7d.value - a.volume_7d.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.volume_7d.value - b.volume_7d.value}
            })
        }
        if(type ==='Fees (24hrs)'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.fees_24h.value - a.fees_24h.value}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.fees_24h.value - b.fees_24h.value}
            })
        }
                if(type ==='1y Feels/Liquidity'){
            data.sort((a,b)=>{
                if(this.arrow === 'low'){ this.arrow = 'high'; return b.fees_24h.change - a.fees_24h.change}
                if(this.arrow === 'high'){this.arrow = 'low'; return a.fees_24h.change - b.fees_24h.change}
            })
        }


    }

    addLocalStorageSTORE=(symbol, address)=>{
        localStorage.setItem(symbol, address)
    }
    removeLocalStoreSTORE=(symbol)=>{
        localStorage.removeItem(symbol)
    }

    footerUpdate=()=>{
        const a = JSON.stringify(localStorage)
        const b = JSON.parse(a)
        this.footerState = Object.entries(b)
    }    

    updatebuttonFavoritesFlag=()=>{
        this.buttonFavoritesFlag = ! this.buttonFavoritesFlag
    }
   
    get getFooterState (){
        return this.footerState
    }

    get getTokens (): any {
        return this.tokens
    }

    get getPairs (): any {
        return this.pairs
    }

    get getOverview (): any {
        return this.overview
    }

    get getSingleToken (): any {
        return this.singleToken
    }
    
    get getSinglePair (): any {
        return this.singlePair
    }


}


export const store = new StoreApp()