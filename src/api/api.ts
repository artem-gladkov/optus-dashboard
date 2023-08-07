import { getEnvVariable, isProd } from "../config/env";
import {
  type ISearch,
  type IDexOverview,
  type IDex,
  type IToken,
  type IPair,
  type ITransaction,
} from "./types";

class Api {
  private _currentNetwork = isProd()
    ? getEnvVariable("REACT_APP_API_URL")
    : getEnvVariable("REACT_APP_API_URL_DEV");

  constructor() {}

  getSearchData = async (account: string): Promise<ISearch> => {
    const response = await fetch(
      `${this._currentNetwork}/search?value=${account}`
    );
    const request: ISearch = await response.json();
    return request;
  };

  getDexOverviewData = async (): Promise<IDexOverview> => {
    const response = await fetch(`${this._currentNetwork}/dex_overview`);
    const request: IDexOverview = await response.json();
    return request;
  };

  getDexData = async (dex: string): Promise<IDex> => {
    const response = await fetch(`${this._currentNetwork}/dex?dex=${dex}`);
    const request: IDex = await response.json();
    return request;
  };

  getTokenData = async (
    token_address: string,
    dex?: string
  ): Promise<IToken> => {
    const URL = dex
      ? `${this._currentNetwork}/token?token_address=${token_address}&dex=${dex}`
      : `${this._currentNetwork}/token?token_address=${token_address}`;

    const response = await fetch(URL);
    const request: IToken = await response.json();
    return request;
  };

  getPairData = async (pair_address: string, dex?: string): Promise<IPair> => {
    const URL = dex
      ? `${this._currentNetwork}/pair?pair_id=${pair_address}&dex=${dex}`
      : `${this._currentNetwork}/pair?pair_id=${pair_address}`;

    const response = await fetch(URL);
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
}
