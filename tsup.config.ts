import { defineConfig } from "tsup";
export default defineConfig({
  entry: [
    "./src/tokens/list-test.ts",
    "./src/tokens/list.ts",
    "./src/tokens/map.ts",
    "./src/tokens/map.ts",
    "./src/chains.ts",
  ],
  target: "es2022",
  dts: true,
});
