export type Ensure<T, K extends keyof T> = T &
  Required<{ [key in K]: NonNullable<T[key]> }>;

/** fetched token */
export interface RawToken {
  /** Unique identifier for the token in the system */
  id: number; //

  /** Short code/symbol for the token
   * @example "BTC" */
  code: string; //

  /** Full name of the token
   * @example "Bitcoin" */
  name: string; //

  /** Whether the token is currently enabled for transactions */
  enable: boolean;

  /** Regular expression pattern for validating wallet addresses specific to this token
   * @example "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$" */
  wallet_regex: string;

  /** Priority of the token in the system (lower number means higher priority) */
  priority: number;

  /** Indicates if the token requires an extra ID (e.g., memo, tag) for transactions */
  extra_id_exists: boolean;

  /** Regular expression pattern for validating the extra ID, if applicable */
  extra_id_regex: string | null;

  /** URL to the token's logo image
   * @example "/images/coins/btc.svg" */
  logo_url: string;

  /** Whether the token is being tracked in the system */
  track: boolean;

  /** CoinGecko ID for the token, used for price data
   * @example "bitcoin" */
  cg_id: string;

  /** Indicates if there's a maximum limit for transactions */
  is_maxlimit: boolean;

  /** Blockchain network the token operates on
   * @example "btc" */
  network: string | null;

  /** Smart contract address for token, if applicable (null for native blockchain currencies) */
  smart_contract: string | null;

  /** Precision of the token on its network */
  network_precision: string | null;

  /** URL pattern for exploring transactions on the blockchain */
  explorer_link_hash: string | null;

  /** Decimal precision for displaying the token amount */
  precision: number;

  /** Trading symbol/ticker for the token */
  ticker: string | null;

  /** Indicates if the token is classified as a DeFi (Decentralized Finance) token */
  is_defi: boolean;

  /** Indicates if the token is considered popular in the system */
  is_popular: boolean;

  /** Indicates if the token is classified as a stablecoin */
  is_stable: boolean;

  /** Indicates if the token is available for conversion operations */
  available_for_to_conversion: boolean;

  /** Trust Wallet identifier for the token, if applicable */
  trust_wallet_id: string | null;
}

/** tokens res */
export interface RawTokensRes {
  /** Array of all supported cryptocurrency tokens in the system */
  currencies: Token[];
}



export interface ChainInfo {
  /**@example "Polygon" */
  name: string;
  /**@example "#000" */
  color: string;
}

export interface Token {
  id: string;
  /** @example "BTC" */
  code: string;
  name: string;
  precision: number;
  /** @example "/images/coins/logo.png" */
  logo: string;

  /** @example "matic" */
  network: string;
  /** network brand color @example "#fff" */
  color: string;
  /** coingecko id */
  cg_id: string;
}