import fs from "fs";
import crypto from "crypto";
import type { Ensure, RawToken, Token } from "../types";
import chains from "../chains.json";

type Filtered = Ensure<RawToken, "network">;

export const token_filter = (token: RawToken): token is Filtered => {
  return token.enable && !!token.network;
};

export function write_json(json: object, file_path: string) {
  const str = JSON.stringify(json);
  const hash = crypto.createHash("sha256").update(str).digest("hex");
  fs.writeFileSync(file_path, str);
  console.log({ file_path });
  const file_name = file_path.split("/").at(-1)?.split(".")[0];
  return `${file_name}:${hash}`;
}

export const to_processed = (t: Filtered): Token => {
  return {
    id: t.id.toString(),
    code: t.code,
    name: t.name,
    precision: t.precision,
    logo: t.logo_url,
    network: t.network,
    color: (chains as any)[t.network].color,
    cg_id: t.cg_id,
  };
};

export function process_tokens(tokens: RawToken[], file_path: string) {
  const processed = tokens
    .filter(token_filter)
    .toSorted((a, b) => a.priority - b.priority)
    .map<Token>(to_processed);

  return write_json(processed, file_path);
}
