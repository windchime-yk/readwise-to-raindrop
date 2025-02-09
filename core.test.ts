import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { CsvExtractor, CsvRewriter } from "./core.ts";

describe("CsvExtractor", () => {
  const csv =
    "Title,URL,ID,Document tags,Saved date,Reading progress,Location,Seen\nArticle Title,https://example.com,01gmjxjdxs6snfysns8hj3ssnk,['example'],2022-11-06 04:33:50+00:00,0,new,True\nArticle Title2,https://example.com,01gmjxjdxs6snfysns8hj3ssnk,['example'],2022-11-06 04:33:50+00:00,0,feed,True";

  const extractor = new CsvExtractor();

  describe("readwiseCsvToJson", () => {
    it("All extract to JSON", () => {
      expect(extractor.readwiseToJson({ csv })).toEqual([{
        title: "Article Title",
        url: "https://example.com",
        id: "01gmjxjdxs6snfysns8hj3ssnk",
        document_tags: ["example"],
        saved_date: "2022-11-06 04:33:50+00:00",
        reading_progress: "0",
        location: "new",
        seen: "True",
      }, {
        title: "Article Title2",
        url: "https://example.com",
        id: "01gmjxjdxs6snfysns8hj3ssnk",
        document_tags: ["example"],
        saved_date: "2022-11-06 04:33:50+00:00",
        reading_progress: "0",
        location: "feed",
        seen: "True",
      }]);
    });

    it("Ignore feed location", () => {
      expect(extractor.readwiseToJson({ csv, ignoreFeed: true })).toEqual([{
        title: "Article Title",
        url: "https://example.com",
        id: "01gmjxjdxs6snfysns8hj3ssnk",
        document_tags: ["example"],
        saved_date: "2022-11-06 04:33:50+00:00",
        reading_progress: "0",
        location: "new",
        seen: "True",
      }]);
    });
  });
});

describe("CsvRewriter", () => {
  const data = [{
    title: "Article Title",
    url: "https://example.com",
    id: "01gmjxjdxs6snfysns8hj3ssnk",
    document_tags: ["example"],
    saved_date: "2022-11-06 04:33:50+00:00",
    reading_progress: "0",
    location: "new",
    seen: "True",
  }, {
    title: "Article Title2",
    url: "https://example.com",
    id: "01gmjxjdxs6snfysns8hj3ssnk",
    document_tags: ["example", "example2"],
    saved_date: "2022-11-06 04:33:50+00:00",
    reading_progress: "0",
    location: "feed",
    seen: "True",
  }];
  const rewriter = new CsvRewriter();
  describe("jsonToRaindrop", () => {
    it("Convert JSON to Raindrop CSV", () => {
      expect(rewriter.jsonToRaindrop(data)).toEqual(
        'title,url,tags,highlights,created,cover\r\nArticle Title,https://example.com,example,,2022-11-06 04:33:50+00:00,\r\nArticle Title2,https://example.com,"example,example2",,2022-11-06 04:33:50+00:00,\r\n',
      );
    });
  });
});
