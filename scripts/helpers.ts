import fs from "fs";
import crypto from "crypto";
import type { Ensure, ProcessedToken, Token } from "./types";

type Filtered = Ensure<Token, "network">;

export const token_filter = (token: Token): token is Filtered => {
  return token.enable || !!token.network;
};

export function write_token_json(json: object, file_name: string) {
  const str = JSON.stringify(json);
  const hash = crypto.createHash("sha256").update(str).digest("hex");
  const hash_portion = hash.slice(hash.length - 5);
  fs.writeFileSync(`./dist/tokens/${file_name}_${hash_portion}.json`, str);
}

export const to_processed = (t: Filtered): ProcessedToken => ({
  id: t.id.toString(),
  code: t.code,
  name: t.name,
  precision: t.precision,
  logo: t.logo_url,
  network: t.network,
  cg_id: t.cg_id,
});

export function process_tokens(tokens: Token[], file_name: string) {
  const processed = tokens
    .filter(token_filter)
    .toSorted((a, b) => a.priority - b.priority)
    .map<ProcessedToken>(to_processed);

  write_token_json(processed, file_name);
}
