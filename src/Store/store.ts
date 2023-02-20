import { makeAutoObservable, runInAction } from "mobx"
import { toJS } from "mobx"


class StoreApp {
   private tokens = []
   private pairs = []
   private overview: any = {}
   private singleToken: any = {}
   private singlePair: any = {}

   public buttonType: string[] = ['All', 'Swaps', 'Adds', 'Removes']
   public buttonTransactions: string[] = ['Total Value', 'Token Amount', 'Token Amount ', 'Account', 'Time']
   public toggleSort: boolean = true

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

    updateToggleSort=()=>{
        this.toggleSort = !this.toggleSort
    }

    sortTransactions =(type:string, data: any[])=>{
        if(type ==='Total Value'){
            data.sort((a: { usd_amount: { value: number } },b: { usd_amount: { value: number } })=>{
                if(this.toggleSort){ this.arrow = 'high'; return b.usd_amount.value - a.usd_amount.value}
                if(!this.toggleSort){this.arrow = 'low'; return a.usd_amount.value - b.usd_amount.value}
            })
        }
        if(type ==='Token Amount'){
            data.sort((a: { symbol_one_amount: { value: number } },b: { symbol_one_amount: { value: number } })=>{
                if(this.toggleSort){ this.arrow = 'high'; return b.symbol_one_amount.value - a.symbol_one_amount.value}
                if(!this.toggleSort){this.arrow = 'low'; return a.symbol_one_amount.value - b.symbol_one_amount.value}
            })
        }
        if(type ==='Token Amount '){
            data.sort((a: { symbol_two_amount: { value: number } },b: { symbol_two_amount: { value: number } })=>{
                if(this.toggleSort){ this.arrow = 'high'; return b.symbol_two_amount.value - a.symbol_two_amount.value}
                if(!this.toggleSort){this.arrow = 'low'; return a.symbol_two_amount.value - b.symbol_two_amount.value}
            })
        }
        if(type ==='Time'){
            data.sort((a: { timestamp: number },b: { timestamp: number })=>{
                if(this.toggleSort){ this.arrow = 'high'; return b.timestamp - a.timestamp}
                if(!this.toggleSort){this.arrow = 'low'; return a.timestamp - b.timestamp}
            })
        }

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