import { describe, expect, it } from "vitest";
import { normalizeWord } from "../utils/normalize";

describe("normalizeWord", () => {
  it("removes accents from lowercase", () => {
    expect(normalizeWord("coração")).toBe("CORACAO");
  });

  it("removes accents from uppercase", () => {
    expect(normalizeWord("CORAÇÃO")).toBe("CORACAO");
  });

  it("handles mixed accents", () => {
    expect(normalizeWord("àáâãäå")).toBe("AAAAAA");
  });

  it("handles cedilha", () => {
    expect(normalizeWord("ça")).toBe("CA");
  });

  it("handles til", () => {
    expect(normalizeWord("não")).toBe("NAO");
  });

  it("preserves plain ASCII", () => {
    expect(normalizeWord("cachorro")).toBe("CACHORRO");
  });

  it("handles empty string", () => {
    expect(normalizeWord("")).toBe("");
  });
});
