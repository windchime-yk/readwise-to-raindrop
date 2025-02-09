import { parse } from "@std/csv";

interface ReadwiseCsvToJsonOption {
  csv: string;
  ignoreFeed?: boolean;
}

/** CSV data extractor */
export class CsvExtractor {
  /**
   * Readwise export CSV to JSON
   */
  public readwiseToJson(
    { csv, ignoreFeed = false }: ReadwiseCsvToJsonOption,
  ): Record<string, string | string[]>[] {
    const data = parse(csv, { skipFirstRow: true });

    return this.convertKeyValue(data, ignoreFeed);
  }

  private convertKeyValue(
    data: Record<string, string>[],
    ignoreFeed: boolean,
  ): Record<string, string | string[]>[] {
    const convertedData = data.map((arr) =>
      Object.fromEntries(
        Object.entries(arr).map((
          [key, value],
        ) => [
          key.toLowerCase().replaceAll(" ", "_"),
          /\[(.+)\]/.test(value) ? this.convertStringToArray(value) : value,
        ]),
      )
    );

    if (ignoreFeed) return convertedData.filter((d) => d.location !== "feed");

    return convertedData;
  }

  private convertStringToArray(str: string): string[] {
    return str.replace(/^\[|\]$/g, "").split(/,\s*/).map((s) =>
      s.replace(/^'|'$/g, "")
    );
  }
}
