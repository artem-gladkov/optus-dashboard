import { makeAutoObservable, runInAction } from "mobx"



class StoreApp {
   private tokens = []
   private pairs = []
   private singleToken = [] 

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
        const getPairs = await fetch('http://217.61.62.159:8001/api/v1/dashboard/top_pairs?limit=20')
        const respPairs = await getPairs.json()
        runInAction(()=>{
            this.pairs =  respPairs
        })
    }

    singleTokenApi = async(address: string, period: string)=> {
        const getToken = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/token?address=${address}&period=${period}&dex=STON.fi`)
        const respGetToken = await getToken.json()
        runInAction(()=>{
            this.singleToken = respGetToken
        })
    }

    get getTokens (): any {
        return this.tokens
    }

    get getPairs (): any {
        return this.pairs
    }

    get getSingleToken (): any {
        return this.singleToken
    }
 
}


export const store = new StoreApp()