import { type Token } from "./types";
import existing_chains from "../dist/chains.json";
import {
  process_tokens,
  to_processed,
  token_filter,
  write_token_json,
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
process_tokens(filtered_tokens, "tokens");
process_tokens(filtered_test_tokens, "tokens_test");

/// generate tokens map ///
const tokens_map = all_filtered_tokens.reduce((prev, curr) => {
  prev[curr.id] = to_processed(curr);
  return prev;
}, {} as any);

write_token_json(tokens_map, "tokens_map");
