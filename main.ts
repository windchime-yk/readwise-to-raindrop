import { parseArgs } from "@std/cli";
import { CsvExtractor, CsvRewriter } from "./core.ts";

const args = parseArgs(Deno.args, {
  string: ["csv"],
  boolean: ["ignoreFeed"],
});

if (!args.csv) {
  console.error("Usage: main.ts --csv <path to csv file>");
  Deno.exit(1);
}

const csvData = await Deno.readTextFile(args.csv);
const extractor = new CsvExtractor();
const jsonData = extractor.readwiseToJson({
  csv: csvData,
  ignoreFeed: args.ignoreFeed,
});
const rewriter = new CsvRewriter();
const raindropData = rewriter.jsonToRaindrop(jsonData);
await Deno.writeTextFile("raindrop.csv", raindropData);
