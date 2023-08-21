/* eslint-disable array-callback-return */
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { isProd, getEnvVariable } from "../config/env";
import { log } from "console";
import { api } from "../api/api";
import { IDex, IPairList, ITokenList } from "../api/types";

class StoreApp {
  private tokens: ITokenList = [];
  private pairs: IPairList[] = [];
  private overview: IDex;
  private singleToken: any = {};
  private singlePair: any = {};
  private transactions: any = [];

  private errorTokens: boolean = false;
  private errorTransactions: boolean = false;
  private errorPairs: boolean = false;
  private errorOverview: boolean = false;
  private errorSingleToken: boolean = false;
  private errorSinglePair: boolean = false;

  private _currentNetwork = isProd()
    ? getEnvVariable("REACT_APP_API_URL")
    : getEnvVariable("REACT_APP_API_URL_DEV");

  private buttonPagination: number[] = [];

  public buttonFavoritesFlag: boolean = false;
  private footerState: any = [];

  public buttonFilterTransaction: string[] = [
    "All",
    "Swaps",
    "Adds",
    "Removes",
  ];
  public activeButtonFilter: any = this.buttonFilterTransaction[0];

  public buttonTransactions: string[] = [
    "Total Value",
    "Token Amount",
    "Token Amount ",
    "Account",
    "Time",
  ];
  public activeButtonTransactions: any = this.buttonTransactions[0];

  public buttonTokens: string[] = [
    "Symbol",
    "Liquidity $",
    "Liquidity Jettons",
    "Volume (24hrs)",
    "Price",
    "Price Change (24hrs)",
  ];
  public activeButtonTokens: string = this.buttonTokens[0];

  public buttonPairs: string[] = [
    "Liquidity",
    "Liquidity Jettons",
    "Volume (24hrs)",
    "Volume (7d)",
    "Fees (24hrs)",
    "1y Feels/Liquidity",
  ];
  public activeButtonPairs: string = this.buttonPairs[0];
  public buttonDex: {} = {
    OPTUS: "0",
    "STON.fi": "1",
    Megaton: "2",
    DeDust: "3",
    Tegro: "4",
    Flex: "5",
  };
  public activeButtonDex: string;
  public dexId: string;

  public buttonDexPage: string[] = [
    "Volume (24hrs)",
    "Liquidity",
    "Transactions",
    "Pairs",
  ];
  public activeButtonDexPage: string = this.buttonDexPage[0];

  public page: string[] = ["", "pairs", "tokens", "dexoverview"];
  public activePage: string = this.page[0];

  public handlerButtonDex: boolean = true;

  public sortFlag: boolean = false;
  public arrow: string = "high";

  constructor() {
    makeAutoObservable(this);
    // this.dexListApi();
  }

  dexListApi = async () => {
    try {
      //   const response = await api.getDexList();
      //   runInAction(() => {
      //     this.buttonDex[response] = response.map((dexData) => {
      //       return {
      //         id: String(dexData.id),
      //         name: dexData.name,
      //       };
      //     });
      //   });
    } catch (error) {
      console.log("dexListApi>>>>>", error);
    }
  };

  tokensApi = async (params: {
    dex_id?: string;
    accaunt_id?: string;
    limit: string;
  }) => {
    try {
      const { dex_id, accaunt_id, limit } = params;

      const response = await api.getTokenList(params);
      runInAction(() => {
        this.tokens = response;
        this.updateErrorTokens(false);
      });
    } catch (error) {
      this.updateErrorTokens(true);
      console.log("tokensApi>>>>>", error);
    }
  };

  pairsApi = async (params: {
    dex_id?: string;
    pair_id?: string;
    accaunt_id?: string;
    limit: string;
  }) => {
    try {
      const response = await api.getPairList(params);
      console.log(response)
      runInAction(() => {
        this.pairs = response;
        this.updateErrorPairs(false);
      });
    } catch (error) {
      this.updateErrorPairs(true);
      console.log("pairsApi>>>>>", error);
    }
  };

  pairsForTokensApi = async (activedex, addressToken) => {
    try {
      const reqPairs = await fetch(
        `${this._currentNetwork}/top_pairs?token_address=${addressToken}&dex=${
          activedex || "OPTUS"
        }`
      );
      if (!reqPairs.ok) {
        this.updateErrorPairs(true);
        throw new Error(reqPairs.statusText);
      }
      const respPairs = await reqPairs.json();
      runInAction(() => {
        this.pairs = respPairs;
        this.updateErrorPairs(false);
      });
    } catch (error) {
      this.updateErrorPairs(true);
      console.log("pairsApi>>>>>", error);
    }
  };

  overviewApi = async (dex: string) => {
    this.updateDexId(this.buttonDex[dex]);
    try {
      const response = await api.getDexData(this.dexId);
      console.log(response, "overview");
      runInAction(() => {
        this.updateOverview(response);
        this.updateErrorOwerview(false);
      });
    } catch (error) {
      this.updateErrorOwerview(true);
      console.log("overviewApi>>>>", error);
    }
  };

  updateHandlerButtonDex = () => {
    this.handlerButtonDex = !this.handlerButtonDex;
  };
  updateHandlerButtonDexBo = (boolean) => {
    this.handlerButtonDex = boolean;
  };

  getTokenSingleApi = async (address: any, period: any, activedex) => {
    try {
      const reqToken = await fetch(
        `${
          this._currentNetwork
        }/token?address=${address}&period=${period}&dex=${activedex || "OPTUS"}`
      );
      if (!reqToken.ok) {
        this.updateSingleTokenError(true);
        throw new Error(reqToken.statusText);
      }
      const resToken = await reqToken.json();
      runInAction(() => {
        this.singleToken = resToken;
        this.updateSingleTokenError(false);
      });
    } catch (error) {
      this.updateSingleTokenError(true);
      console.log("getTokenSingleApi>>>>>>", error);
    }
  };

  getPairSingleApi = async (address: any, period: any, activedex) => {
    try {
      const reqPair = await fetch(
        `${this._currentNetwork}/pair?address=${address}&dex=${
          activedex || "OPTUS"
        }`
      );
      if (!reqPair.ok) {
        this.updateSinglePairError(true);
        throw new Error(reqPair.statusText);
      }
      const resPair = await reqPair.json();
      runInAction(() => {
        this.singlePair = resPair;
        this.updateSinglePairError(false);
      });
    } catch (error) {
      this.updateSinglePairError(true);
      console.log("getPairSingleApi>>>>>", error);
    }
  };

  getTransactions = async (activedex) => {
    try {
      const reqTransactions = await fetch(
        `${this._currentNetwork}/transactions?dex=${activedex || "OPTUS"}`
      );
      if (!reqTransactions.ok) {
        this.updateErrorTransactions(true);
        throw new Error(reqTransactions.statusText);
      }
      const resTransactions = await reqTransactions.json();
      runInAction(() => {
        this.transactions = resTransactions;
        this.updateErrorTransactions(false);
      });
    } catch (error) {
      this.updateErrorTransactions(true);
      console.log("getTransactionsApi>>>>>", error);
    }
  };

  getSinglePairTransctions = async (activedex, pairAddress) => {
    try {
      const reqTransactions = await fetch(
        `${this._currentNetwork}/transactions?pair_address=${pairAddress}&dex=${
          activedex || "OPTUS"
        }`
      );
      if (!reqTransactions.ok) {
        this.updateErrorTransactions(true);
        throw new Error(reqTransactions.statusText);
      }
      const resTransactions = await reqTransactions.json();
      runInAction(() => {
        this.transactions = resTransactions;
        this.updateErrorTransactions(false);
      });
    } catch (error) {
      this.updateErrorTransactions(true);
      console.log("getTransactionsApi>>>>>", error);
    }
  };

  getSingleTokenTransctions = async (activedex, tokenAddress) => {
    try {
      const reqTransactions = await fetch(
        `${
          this._currentNetwork
        }/transactions?token_address=${tokenAddress}&dex=${
          activedex || "OPTUS"
        }`
      );
      if (!reqTransactions.ok) {
        this.updateErrorTransactions(true);
        throw new Error(reqTransactions.statusText);
      }
      const resTransactions = await reqTransactions.json();
      runInAction(() => {
        this.transactions = resTransactions;
        this.updateErrorTransactions(false);
      });
    } catch (error) {
      this.updateErrorTransactions(true);
      console.log("getTransactionsApi>>>>>", error);
    }
  };

  updateFilterButton = (type: string) => {
    this.activeButtonFilter = type;
  };

  updateActiveButtonTransaction = (type: string) => {
    this.activeButtonTransactions = type;
  };

  updateActiveButtonTokens = (type: string) => {
    this.activeButtonTokens = type;
  };

  updateActiveButtonPairs = (type: string) => {
    this.activeButtonPairs = type;
  };

  updateActiveButtonDex = (type: string) => {
    this.activeButtonDex = type;
  };

  updateArrow = () => {
    this.sortFlag ? (this.arrow = "high") : (this.arrow = "low");
  };

  updateButtonPagination = (button: number[]) => {
    this.buttonPagination = button;
  };

  updateErrorTokens = (boolean) => {
    this.errorTokens = boolean;
  };

  updateErrorPairs = (boolean) => {
    this.errorPairs = boolean;
  };

  updateErrorTransactions = (boolean) => {
    this.errorTransactions = boolean;
  };

  updateErrorOwerview = (boolean) => {
    this.errorOverview = boolean;
  };

  updateSingleTokenError = (boolean) => {
    this.errorSingleToken = boolean;
  };

  updateSinglePairError = (boolean) => {
    this.errorSinglePair = boolean;
  };

  updateTransactions = async (data) => {
    this.transactions = data;
  };

  updateOverview = async (data) => {
    this.overview = data;
  };

  updateActivePage = (page) => {
    this.activePage = page;
  };

  updateDexId = (dex_id) => {
    this.dexId = dex_id;
  };
  sortTransactions = (type: string, data: any[]) => {
    if (type === "Total Value") {
      data.sort(
        (
          a: { usd_amount: { value: number } },
          b: { usd_amount: { value: number } }
        ) => {
          if (this.sortFlag === false) {
            return b.usd_amount.value - a.usd_amount.value;
          }
          if (this.sortFlag === true) {
            return a.usd_amount.value - b.usd_amount.value;
          }
        }
      );
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Token Amount") {
      data.sort(
        (
          a: { symbol_one_amount: { value: number } },
          b: { symbol_one_amount: { value: number } }
        ) => {
          if (this.sortFlag === false) {
            return b.symbol_one_amount.value - a.symbol_one_amount.value;
          }
          if (this.sortFlag === true) {
            return a.symbol_one_amount.value - b.symbol_one_amount.value;
          }
        }
      );
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Token Amount ") {
      data?.sort(
        (
          a: { symbol_two_amount: { value: number } },
          b: { symbol_two_amount: { value: number } }
        ) => {
          if (this.sortFlag === false) {
            return b.symbol_two_amount?.value - a.symbol_two_amount?.value;
          }
          if (this.sortFlag === true) {
            return a.symbol_two_amount?.value - b.symbol_two_amount?.value;
          }
        }
      );
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Time") {
      data.sort((a: { timestamp: number }, b: { timestamp: number }) => {
        if (this.sortFlag === false) {
          return b.timestamp - a.timestamp;
        }
        if (this.sortFlag === true) {
          return a.timestamp - b.timestamp;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
  };

  sortTokens = (type: string, data: any[]) => {
    if (type === "Symbol") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return a.symbol.localeCompare(b.symbol);
        }
        if (this.sortFlag === true) {
          return b.symbol.localeCompare(a.symbol);
        }
      });
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Liquidity $") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.liquidity.value - a.liquidity.value;
        }
        if (this.sortFlag === true) {
          return a.liquidity.value - b.liquidity.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }

    if (type === "Liquidity Jettons") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.liquidity.value - a.liquidity.value;
        }
        if (this.sortFlag === true) {
          return a.liquidity.value - b.liquidity.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }

    if (type === "Volume (24hrs)") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.volume_24h.value - a.volume_24h.value;
        }
        if (this.sortFlag === true) {
          return a.volume_24h.value - b.volume_24h.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Price") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.current_usd_price.value - a.current_usd_price.value;
        }
        if (this.sortFlag === true) {
          return a.current_usd_price.value - b.current_usd_price.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Price Change (24hrs)") {
      this.tokens = data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.current_usd_price.change - a.current_usd_price.change;
        }
        if (this.sortFlag === true) {
          return a.current_usd_price.change - b.current_usd_price.change;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
  };

  sortPairs = (type: string, data: any[]) => {
    if (type === "Liquidity") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.liquidity.value - a.liquidity.value;
        }
        if (this.sortFlag === true) {
          return a.liquidity.value - b.liquidity.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Volume (24hrs)") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.volume_24h.value - a.volume_24h.value;
        }
        if (this.sortFlag === true) {
          return a.volume_24h.value - b.volume_24h.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }

    if (type === "Volume (7d)") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.volume_7d.value - a.volume_7d.value;
        }
        if (this.sortFlag === true) {
          return a.volume_7d.value - b.volume_7d.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
    if (type === "Fees (24hrs)") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.fees_24h.value - a.fees_24h.value;
        }
        if (this.sortFlag === true) {
          return a.fees_24h.value - b.fees_24h.value;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
    if (type === "1y Feels/Liquidity") {
      data.sort((a, b) => {
        if (this.sortFlag === false) {
          return b.fees_24h.change - a.fees_24h.change;
        }
        if (this.sortFlag === true) {
          return a.fees_24h.change - b.fees_24h.change;
        }
      });
      this.sortFlag = !this.sortFlag;
    }
  };

  getTransactionFilter = () => {
    this.getTrans.filter((trans: { type: string }) => {
      if (this.activeButtonFilter === "All") {
        return trans;
      }
      if (this.activeButtonFilter === "Swaps") {
        return trans?.type === "swap";
      }
      if (this.activeButtonFilter === "Adds") {
        return trans?.type === "add";
      }
      if (this.activeButtonFilter === "Removes") {
        return trans?.type === "remove";
      }
    });
  };

  addLocalStorageSTORE = (symbol, address) => {
    localStorage.setItem(symbol, address);
  };

  removeLocalStoreSTORE = (symbol) => {
    localStorage.removeItem(symbol);
  };

  footerUpdate = () => {
    const a = JSON.stringify(localStorage);
    const b = JSON.parse(a);
    this.footerState = Object.entries(b);
  };

  updatebuttonFavoritesFlag = () => {
    this.buttonFavoritesFlag = !this.buttonFavoritesFlag;
  };

  get getActiveButtonDex() {
    return this.activeButtonDex;
  }

  get getFooterState() {
    return this.footerState;
  }

  get getTokens(): ITokenList {
    return this.tokens;
  }

  get getPairs(): any {
    return this.pairs;
  }

  get getOverview(): IDex {
    return this.overview;
  }

  get getSingleToken(): any {
    return this.singleToken;
  }

  get getSinglePair(): any {
    return this.singlePair;
  }

  get getTrans() {
    return this.transactions;
  }

  get getPaginationButton(): any {
    return this.buttonPagination;
  }

  get getErrorTokens(): boolean {
    return this.errorTokens;
  }

  get getErrorPairs(): boolean {
    return this.errorPairs;
  }

  get getErrorTransactions(): boolean {
    return this.errorTransactions;
  }

  get getErrorOverview(): boolean {
    return this.errorOverview;
  }

  get getErrorSingleToken(): boolean {
    return this.errorSingleToken;
  }

  get getErrorSinglePair(): boolean {
    return this.errorSinglePair;
  }
}

export const store = new StoreApp();
