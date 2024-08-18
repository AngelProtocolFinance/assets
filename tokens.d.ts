declare module "@better-giving/assets/tokens/map.json" {
  const map: {
    [token_symbol: string]: import("./types.ts").ProcessedToken;
  };
  export default map;
}
declare module "@better-giving/assets/tokens/prod.json" {
  const tokens: import("./types.ts").ProcessedToken[];
  export default tokens;
}
declare module "@better-giving/assets/tokens/test.json" {
  const tokens: import("./types.ts").ProcessedToken[];
  export default tokens;
}

declare module "@better-giving/assets/chains.json" {
  const map: {
    [network_id: string]: import("./types.ts").ChainInfo;
  };
  export default map;
}
