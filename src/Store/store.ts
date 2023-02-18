import { makeAutoObservable, runInAction } from "mobx"
import { toJS } from "mobx"


class StoreApp {
   private tokens = []
   private pairs = []
   private overview: any = {}
   private singleToken: any = {}
   private singlePair: any = {}


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