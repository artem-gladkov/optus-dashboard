export type TValueChange = {
  value: string;
  change: string;
};

export interface IModelTypes {
  id: number;
  name: string;
  volume_24h: TValueChange;
  liquidity: TValueChange;
  transactions_24h: TValueChange;
  pairs_number: TValueChange;
}

export interface ISearch extends IModelTypes {}

export interface IDexOverview {
  ton_price: TValueChange;
  transactions_24h: TValueChange;
  pairs_number: TValueChange;
  fees_24h: TValueChange;
  liquidity_chart: string[];
  volume_chart: string[];
}

export interface IDex {
  id: number;
  name: string;
  description: string;
  router_contract: RouterContract;
  liquidity: { usd: TValueChange; ton: TValueChange };
  volume_24h: { usd: TValueChange; ton: TValueChange };
  transactions_24h: TValueChange;
  pairs_number: TValueChange;
  ton_price: TValueChange;
  fees_24h: TValueChange;
  liquidity_chart: { usd: string[]; ton: string[] };
  volume_chart: { usd: string[]; ton: string[] };
}

export interface RouterContract {
  id: number;
  address: string;
  workchain_id: number;
  account_id: string;
  name: string;
  description: string;
  contract_metadata: ContractMetadata;
}

export interface ContractMetadata {
  id: number;
  name: string;
  description: string;
  image: string;
  symbol: string;
  decimals: number;
}

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  image: string;
  decimals: number;
  native_liquidity: TValueChange;
  liquidity: TValueChange;
  volume_24h: TValueChange;
  current_usd_price: TValueChange;
  transactions_24h: TValueChange;
  liquidity_graph: string[];
  volume_graph: string[];
  usd_price_graph: string[];
}

export interface IPair {
  address: string;
  name: string;
  token_one: IToken;
  token_two: IToken;
  liquidity: TValueChange;
  volume_24h: TValueChange;
  volume_7d: TValueChange;
  fees_24h: TValueChange;
  fees_liquidity_ratio: TValueChange;
  symbol_one_indicators: ISymbolIndicators;
  symbol_two_indicators: ISymbolIndicators;
  liquidity_graph: string[];
  volume_graph: string[];
  symbol_one_price_graph: string[];
  symbol_two_price_graph: string[];
}

export interface ISymbolIndicators {
  current_pair_price: TValueChange;
  pool_quantity: TValueChange;
  current_usd_price: TValueChange;
}

// export interface ITransaction {
//   hash: string;
//   timestamp: number;
//   account: string;
//   name: string;
//   type: string;
//   usd_amount: TValueChange;
//   symbol_one: Symbol;
//   symbol_one_amount: TValueChange;
//   symbol_two: Symbol;
//   symbol_two_amount: TValueChange;
//   time_ago: string;
//   operation: IOperation;
// }

export interface IOperation {
  id: number;
  timestamp: number;
  name: string;
  user_account: IUserAccount;
  type: string;
  amount: { usd: TValueChange; ton: TValueChange };
  token_0: {
    symbol: string;
    amount: TValueChange;
  };
  token_1: {
    symbol: string;
    amount: TValueChange;
  };
  time_ago: string;
}
export interface IUserAccount {
  id: number;
  address: string;
}

export type ITokenList = Omit<
  IToken,
  "liquidity_graph" | " volume_graph" | "usd_price_graph"
>[];

export interface IDexList {
  id: number;
  name: string;
  description: string;
  router_contract: IRouterContract;
  liquidity: {
    ton: TValueChange;
    usd: TValueChange;
  };
  volume_24h: {
    ton: TValueChange;
    usd: TValueChange;
  };
  transactions_24h: TValueChange;
  pairs_number: TValueChange;
}

export interface IRouterContract {
  id: number;
  address: string;
  workchain_id: number;
  account_id: string;
  name: string;
  description: string;
  contract_metadata: ContractMetadata;
}

export interface ContractMetadata {
  id: number;
  name: string;
  description: string;
  image: string;
  symbol: string;
  decimals: number;
}

export interface IPairList {
  address: string;
  name: string;
  token_one: Omit<
    IToken,
    "liquidity_graph" | "volume_graph" | "usd_price_graph"
  >;
  token_two: Omit<
    IToken,
    "liquidity_graph" | "volume_graph" | "usd_price_graph"
  >;
  liquidity: TValueChange;
  volume_24h: TValueChange;
  volume_7d: TValueChange;
  fees_24h: TValueChange;
  fees_liquidity_ratio: TValueChange;
  symbol_one_indicators: ISymbolIndicators;
  symbol_two_indicators: ISymbolIndicators;
}
