/* eslint-disable array-callback-return */
import { makeAutoObservable, runInAction } from "mobx"


class StoreApp {
    private tokens = []
    private pairs = []
    private overview: any = {}
    private singleToken: any = {}
    private singlePair: any = {}
    private transactions: any = []

    private errorTokens: boolean = false
    private errorTransactions: boolean = false
    private errorPairs: boolean = false
    private errorOverview: boolean = false
    private errorSingleToken: boolean = false
    private errorSinglePair: boolean = false


    private buttonPagination: number[] = []

    public buttonFavoritesFlag: boolean = false;
    private footerState: any = []

    public buttonFilterTransaction: string[] = ['All', 'Swaps', 'Adds', 'Removes']
    public activeButtonFilter: any = this.buttonFilterTransaction[0]

    public buttonTransactions: string[] = ['Total Value', 'Token Amount', 'Token Amount ', 'Account', 'Time']
    public activeButtonTransactions: any = this.buttonTransactions[0]

    public buttonTokens: string[] = ['Symbol', 'Liquidity', 'Volume (24hrs)', 'Price', 'Price Change (24hrs)']
    public activeButtonTokens: string = this.buttonTokens[0]

    public buttonPairs: string[] = ['Liquidity', 'Volume (24hrs)', 'Volume (7d)', 'Fees (24hrs)', '1y Feels/Liquidity']
    public activeButtonPairs: string = this.buttonPairs[0]

    public buttonDex: string[]= ['STON.fi', 'Megaton']
    public activeButtonDex: string = this.buttonDex[0]

    public page: string[]= ['', 'pairs', 'tokens']
    public activePage: string = this.page[0]

    public handlerButtonDex: boolean = true
   
   public sortFlag: boolean = false
   public arrow: string = 'high' 

    constructor(){
        makeAutoObservable(this)
    }

   tokensApi = async (activedex) => {
        try  {
            const getTokens = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/top_tokens?limit=50&dex=${activedex || 'STON.fi'}`)
            if(!getTokens.ok){
                this.updateErrorTokens(true)
                throw new Error(getTokens.statusText);
            }
            const respTokens = await getTokens.json()
            runInAction( ()=>{
                this.tokens =   respTokens
                this.updateErrorTokens(false)
            })
        } catch  (error) {
            this.updateErrorTokens(true)
            console.log('tokensApi>>>>>', error)
        }
    }

    pairsApi = async (activedex)  => {
        try {
            const reqPairs = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/top_pairs?limit=50&dex=${activedex || 'STON.fi'}`)
            if(!reqPairs.ok){
                this.updateErrorPairs(true)
                throw new Error(reqPairs.statusText);
            }
            const respPairs = await reqPairs.json()
            runInAction(()=>{
                this.pairs =  respPairs
                this.updateErrorPairs(false)
            })
        } catch (error) {
            this.updateErrorPairs(true)
            console.log('pairsApi>>>>>', error)
        }
    }

    overviewApi = async(period: string, activedex: string) => {
        try {
            const reqOverview = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/overview?period=${period}&dex=${activedex || 'STON.fi'}`)
            if(!reqOverview.ok){
                this.updateErrorOwerview(true)
                throw new Error(reqOverview.statusText);
            }
            const respOverview = await reqOverview.json()
            runInAction(()=>{
                this.updateOverview(respOverview)
                this.updateErrorOwerview(false)
            })

       
        } catch (error) {
            this.updateErrorOwerview(true)
            console.log('overviewApi>>>>',error)    
        }
        
    }

    updateHandlerButtonDex =() => {
        this.handlerButtonDex = !this.handlerButtonDex
    }
    updateHandlerButtonDexBo = (boolean) => {
        this.handlerButtonDex = boolean
    }
 


    getTokenSingleApi = async (address:any, period:any, activedex) => {

        try {
            const reqToken = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/token?address=${address}&period=${period}&dex=${activedex}`)
            if(!reqToken.ok){
                
                this.updateSingleTokenError(true)
                throw new Error(reqToken.statusText);
            }
            const resToken = await reqToken.json()
             runInAction(()=>{
                this.singleToken =  resToken
                this.updateSingleTokenError(false)
            })
    
            } catch (error) {  
                this.updateSingleTokenError(true)
                console.log('getTokenSingleApi>>>>>>',error)   
            }
    }

    getPairSingleApi = async (address:any, period:any, activedex) => {
        try {
            const reqPair = await fetch(`http://217.61.62.159:8001/api/v1/dashboard/pair?address=${address}&period=${period}&dex=${activedex}`)
            if(!reqPair.ok){
                
                this.updateSinglePairError(true)
                throw new Error(reqPair.statusText);
            }
            const resPair = await reqPair.json()
             runInAction(()=>{
                this.singlePair =  resPair
                this.updateSinglePairError(false)
            })
        } catch (error) {
            this.updateSinglePairError(true)
            console.log('getPairSingleApi>>>>>',error)   
        }

    }

    updateFilterButton = (type: string) => {
        this.activeButtonFilter = type
    }

    updateActiveButtonTransaction = (type: string) => {
        this.activeButtonTransactions = type
    }

    updateActiveButtonTokens = (type: string) => {
        this.activeButtonTokens = type
    }

    updateActiveButtonPairs = (type: string) => {
        this.activeButtonPairs = type
    }

    updateActiveButtonDex = (type: string) => {
        this.activeButtonDex = type
    }

    updateArrow =()=>{
            this.sortFlag ? this.arrow = 'high' : this.arrow ='low'
    }

    updateButtonPagination = (button: number[])=>{
        this.buttonPagination = button
    }

    updateErrorTokens = (boolean)=>{
        this.errorTokens = boolean
    }

    updateErrorPairs = (boolean)=>{
        this.errorPairs = boolean
    }

    updateErrorTransactions = (boolean)=>{
        this.errorTransactions = boolean
    }

    updateErrorOwerview = (boolean) => {
        this.errorOverview = boolean
    }

    
    updateSingleTokenError = (boolean)=>{
        this.errorSingleToken = boolean
    }

    updateSinglePairError = (boolean)=>{
        this.errorSinglePair = boolean
    }

    updateTransactions = async (data) => {
         this.transactions =  data
    }

    updateOverview = async (data) => {
        this.overview =  data
    }

    updateActivePage = (page)=> {
        this.activePage = page
    }


    sortTransactions =(type:string, data: any[])=>{
        if(type ==='Total Value'){
            data.sort((a: { usd_amount: { value: number } },b: { usd_amount: { value: number } })=>{
                if(this.sortFlag === false){ return b.usd_amount.value - a.usd_amount.value}
                if(this.sortFlag === true){return a.usd_amount.value - b.usd_amount.value}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Token Amount'){
            data.sort((a: { symbol_one_amount: { value: number } },b: { symbol_one_amount: { value: number } })=>{
                if(this.sortFlag === false){ return b.symbol_one_amount.value - a.symbol_one_amount.value}
                if(this.sortFlag === true){return a.symbol_one_amount.value - b.symbol_one_amount.value}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Token Amount '){
            data?.sort((a: { symbol_two_amount: { value: number } },b: { symbol_two_amount: { value: number } })=>{
                if(this.sortFlag === false){ return b.symbol_two_amount?.value - a.symbol_two_amount?.value}
                if(this.sortFlag === true){  return a.symbol_two_amount?.value - b.symbol_two_amount?.value}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Time'){
            data.sort((a: { timestamp: number },b: { timestamp: number })=>{
                if(this.sortFlag === false){ return b.timestamp - a.timestamp}
                if(this.sortFlag === true){ return a.timestamp - b.timestamp}
            })
            this.sortFlag = !this.sortFlag
        }

    }

    sortTokens =(type:string, data: any[])=>{
        
        if(type ==='Symbol'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){ return  a.symbol.localeCompare(b.symbol)}
                if(this.sortFlag === true){return b.symbol.localeCompare(a.symbol)}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Liquidity'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){ return b.liquidity.value - a.liquidity.value}
                if(this.sortFlag === true){ return a.liquidity.value - b.liquidity.value}} 
              )
              this.sortFlag = !this.sortFlag
        }                    
        
        if(type ==='Volume (24hrs)'){
             data.sort((a,b)=>{
                if(this.sortFlag === false){ return b.volume_24h.value - a.volume_24h.value}
                if(this.sortFlag === true){ return a.volume_24h.value - b.volume_24h.value}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Price'){
             data.sort((a,b)=>{
                if(this.sortFlag === false){  return b.current_usd_price.value - a.current_usd_price.value}
                if(this.sortFlag === true){ return a.current_usd_price.value - b.current_usd_price.value}
            })
            this.sortFlag = !this.sortFlag
        }
                if(type ==='Price Change (24hrs)'){
            this.tokens =  data.sort((a,b)=>{
                if(this.sortFlag === false){  return b.current_usd_price.change - a.current_usd_price.change}
                if(this.sortFlag === true){ return a.current_usd_price.change - b.current_usd_price.change}
            })
            this.sortFlag = !this.sortFlag
        }
    }

    sortPairs =(type:string, data: any[])=>{
        if(type ==='Liquidity'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){  return b.liquidity.value - a.liquidity.value}
                if(this.sortFlag === true){ return a.liquidity.value - b.liquidity.value}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Volume (24hrs)'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){  return b.volume_24h.value - a.volume_24h.value}
                if(this.sortFlag === true){ return a.volume_24h.value - b.volume_24h.value}
            })
            this.sortFlag = !this.sortFlag
        }                    
        
        if(type ==='Volume (7d)'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){  return b.volume_7d.value - a.volume_7d.value}
                if(this.sortFlag === true){ return a.volume_7d.value - b.volume_7d.value}
            })
            this.sortFlag = !this.sortFlag
        }
        if(type ==='Fees (24hrs)'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){  return b.fees_24h.value - a.fees_24h.value}
                if(this.sortFlag === true){ return a.fees_24h.value - b.fees_24h.value}
            })
            this.sortFlag = !this.sortFlag
        }
                if(type ==='1y Feels/Liquidity'){
            data.sort((a,b)=>{
                if(this.sortFlag === false){ return b.fees_24h.change - a.fees_24h.change}
                if(this.sortFlag === true){return a.fees_24h.change - b.fees_24h.change}
            })
            this.sortFlag = !this.sortFlag
        }


    }

    getTransactionFilter= () =>{
        this.getTrans.filter((trans: { type: string; }) => {
           if(this.activeButtonFilter === 'All'){return trans}
           if(this.activeButtonFilter === 'Swaps'){return trans?.type === 'swap'}
           if(this.activeButtonFilter === 'Adds'){return trans?.type === 'add'}
           if(this.activeButtonFilter === 'Removes'){return trans?.type === 'remove'}
       })
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

    getActiveButtonDex = (dex) => {
        this.activeButtonDex = dex
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

    get getTrans (){
        return this.transactions
    }

    get getPaginationButton (): any {
        return this.buttonPagination
    }

    get getErrorTokens (): boolean {
        return this.errorTokens
    }

    get getErrorPairs (): boolean {
        return this.errorPairs
    }

    get getErrorTransactions(): boolean {
        return this.errorTransactions
    }

    get getErrorOverview() : boolean {
        return this.errorOverview
    }

    get getErrorSingleToken(): boolean {
        return this.errorSingleToken
    }

    get getErrorSinglePair(): boolean {
        return this.errorSinglePair
    }

    
}


export const store = new StoreApp()