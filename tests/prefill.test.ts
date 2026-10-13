import { describe, expect, it } from "vitest";
import { prefillFromQuery } from "@/lib/prefill";

describe("prefillFromQuery", () => {
  it("reads first, middle and last", () => {
    expect(prefillFromQuery("?first=Ada&middle=Ngozi&last=Obi")?.name).toEqual({ first: "Ada", middle: "Ngozi", last: "Obi" });
  });
  it("adds a former name as a spelling to check", () => {
    expect(prefillFromQuery("?first=Ada&last=Obi&former=Eze")?.variants).toEqual(["Ada Eze"]);
  });
  it("returns null without a usable name", () => {
    expect(prefillFromQuery("")).toBeNull();
    expect(prefillFromQuery("?first=Ada")).toBeNull();
  });
});
