import { getEnvVariable, isProd } from "../config/env";
import {
  type ISearch,
  type IDexOverview,
  type IDex,
  type IToken,
  type IPair,
  type ITransaction,
  type ITokenList,
  type IDexList,
  type IPairList,
} from "./types";

class Api {
  private _currentNetwork = isProd()
    ? getEnvVariable("REACT_APP_API_URL")
    : getEnvVariable("REACT_APP_API_URL_DEV");

  constructor() {}

  getSearchData = async (searchParams: {
    searchParams: string;
  }): Promise<ISearch> => {
    const params = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${this._currentNetwork}/search?${params}`);
    const request: ISearch = await response.json();
    return request;
  };

  getDexOverviewData = async (): Promise<IDexOverview> => {
    const response = await fetch(`${this._currentNetwork}/dex_overview`);
    const request: IDexOverview = await response.json();
    return request;
  };

  getDexData = async (dex_id: string): Promise<IDex> => {
    const response = await fetch(
      `${this._currentNetwork}/dex?dex_id=${dex_id}`
    );
    const request: IDex = await response.json();
    return request;
  };

  getTokenData = async (searchParams: {
    token_id: string;
    dex_id?: string;
  }): Promise<IToken> => {
    const params = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${this._currentNetwork}/token?${params}`);
    const request: IToken = await response.json();
    return request;
  };

  getPairData = async (searchParams: {
    pair_id: string;
    dex_id?: string;
  }): Promise<IPair> => {
    const params = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${this._currentNetwork}/pair?${params}`);
    const request: IPair = await response.json();
    return request;
  };

  getAccauntData = async () => {}; //дописать когда появится какая то структура

  getTransactionData = async (
    transaction_id: string
  ): Promise<ITransaction> => {
    const response = await fetch(
      `${this._currentNetwork}/transaction?transaction_id=${transaction_id}`
    );
    const request: ITransaction = await response.json();
    return request;
  };

  getDexList = async (limit = 10): Promise<IDexList[]> => {
    const response = await fetch(
      `${this._currentNetwork}/dex_list?limit=${limit}`
    );
    const request: IDexList[] = await response.json();
    return request;
  };

  getTokenList = async (searchParams: {
    dex_id?: string;
    accaunt_id?: string;
    limit: string;
  }): Promise<ITokenList> => {
    const params = new URLSearchParams(searchParams).toString();
    const response = await fetch(
      `${this._currentNetwork}/token_list?${params}`
    );
    const request: ITokenList = await response.json();
    return request;
  };

  getPairList = async (searchParams: {
    dex_id?: string;
    pair_id?: string;
    accaunt_id?: string;
    limit: string;
  }): Promise<IPairList[]> => {
    const params = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${this._currentNetwork}/pair_list?${params}`);
    const request: IPairList[] = await response.json();
    return request;
  };

  getAccauntList = async (searchParams: {
    dex_id?: string;
    token_address?: string;
    pair_id?: string;
    limit: string;
  }) => {
    const params = new URLSearchParams(searchParams).toString();
    const response = await fetch(
      `${this._currentNetwork}/account_list?${params}`
    );
    const request = await response.json();
    return request;
  };

  getTransactionsList = async (searchParams: {
    dex_id?: string;
    token_id?: string;
    pair_id?: string;
    accaunt_id?: string;
    limit: string;
  }) => {
    const params = new URLSearchParams(searchParams).toString();

    const response = await fetch(
      `${this._currentNetwork}/transaction_list?${params}`
    );
    const request: IPairList = await response.json();
    return request;
  };
}

export const api = new Api();
