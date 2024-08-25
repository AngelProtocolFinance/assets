import { type RawToken } from "../types";
import existing_chains from "../generated/chains.json";
import existing_symbols from "../generated/symbols.json";
import {
  process_tokens,
  to_processed,
  token_filter,
  write_json,
} from "./helpers";

const base_url = process.env.api_base_url;

const tokens: RawToken[] = await fetch(
  `${base_url}/v1/crypto/v1/full-currencies`
)
  .then((res) => res.json())
  .then((data: any) => data.currencies);

const test_tokens: RawToken[] = await fetch(
  `${base_url}/staging/crypto/v1/full-currencies`
)
  .then((res) => res.json())
  .then((data: any) => data.currencies);

const filtered_tokens = tokens.filter(token_filter);
const filtered_test_tokens = test_tokens.filter(token_filter);

/// prod tokens override test tokens in maps ///
const all_filtered_tokens = filtered_test_tokens.concat(filtered_tokens);

/// CHECK FOR NEW CHAINS ///
const new_chains: string[] = [];
const new_symbols: string[] = [];
for (const token of all_filtered_tokens) {
  if (!(existing_symbols as any)[token.code]) {
    new_symbols.push(token.code);
  }

  if (!(existing_chains as any)[token.network]) {
    new_chains.push(token.network);
  }
}

if (new_chains.length > 0) {
  console.log({ new_chains });
  throw "New chains found. addt them before proceeding";
}
if (new_symbols.length > 0) {
  console.log({ new_symbols });
  throw "New tokens found. add them before proceeding";
}

/// generate tokens list ///
const id1 = process_tokens(filtered_tokens, "./src/generated/tokens/prod.json");
const id2 = process_tokens(
  filtered_test_tokens,
  "./src/generated/tokens/test.json"
);

/// generate tokens map ///
const tokens_map = all_filtered_tokens.reduce((prev, curr) => {
  prev[curr.code] = to_processed(curr);
  return prev;
}, {} as any);

const id3 = write_json(tokens_map, "./src/generated/tokens/map.json");

// also write hashes to monitor change
write_json([id1, id2, id3], "./src/generated/tokens/hash.json");
