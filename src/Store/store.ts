import { makeAutoObservable, runInAction } from "mobx"
import { toJS } from "mobx"


class StoreApp {
   private tokens = []
   private pairs = []
   private _singleToken: any = {}
   public address = ''
   public period = ''

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

     getTokenApi = async (address:any, period:any) => {
        const reqToken = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/token?address=${address}&period=${period}&dex=STON.fi`)
        const resToken = await reqToken.json()
        runInAction(()=>{
            this._singleToken =  resToken
        })
    }

    setSingleToken=(data: any) : any => {
        this._singleToken = data
    }

    addAddress = (address: string) => {
        this.address = address
    }

    addPeriod = (period: string) => {

    }

    get getTokens () {
        return this.tokens
    }

    get getPairs (): any {
        return this.pairs
    }

    get getSingleToken (): any {
        return this._singleToken
    }
 
}


export const store = new StoreApp()