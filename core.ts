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
    { csv: _csv, ignoreFeed: _ignoreFeed = false }: ReadwiseCsvToJsonOption,
  ) {
    throw new Error("Not implemented");
  }
}
