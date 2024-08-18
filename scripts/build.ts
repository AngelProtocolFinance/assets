import { type Token } from "./types";
import existing_chains from "../dist/chains.json";
import {
  process_tokens,
  to_processed,
  token_filter,
  write_json,
} from "./helpers";

const base_url = process.env.api_base_url;

const tokens: Token[] = await fetch(`${base_url}/v1/crypto/v1/full-currencies`)
  .then((res) => res.json())
  .then((data: any) => data.currencies);

const test_tokens: Token[] = await fetch(
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
for (const token of all_filtered_tokens) {
  if (!token.network) continue;

  if (!(existing_chains as any)[token.network]) {
    new_chains.push(token.network);
  }
}

console.log({ new_chains });

/// generate tokens list ///
const id1 = process_tokens(filtered_tokens, "./dist/tokens/prod.json");
const id2 = process_tokens(filtered_test_tokens, "./dist/tokens/test.json");

/// generate tokens map ///
const tokens_map = all_filtered_tokens.reduce((prev, curr) => {
  prev[curr.code] = to_processed(curr);
  return prev;
}, {} as any);

const id3 = write_json(tokens_map, "./dist/tokens/map.json");

// also write hashes to monitor change
write_json([id1, id2, id3], "./dist/tokens/hash.json");