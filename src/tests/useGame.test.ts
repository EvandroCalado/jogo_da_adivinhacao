import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGame } from "../hooks/useGame";

vi.mock("../utils/sounds", () => ({
  playCorrect: vi.fn(),
  playWrong: vi.fn(),
  playWin: vi.fn(),
  playLose: vi.fn(),
}));

const mockWords = vi.hoisted(() => [
  { id: 1, word: "casa", tip: "Tip 1" },
  { id: 2, word: "cachorro", tip: "Tip 2" },
]);

vi.mock("../utils/words", () => ({
  WORDS: mockWords,
}));

describe("useGame", () => {
  it("initializes with a random challenge", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.challenge).toBeDefined();
    expect(result.current.challenge.word).toBeTruthy();
    expect(result.current.attempts).toBe(0);
  });

  it("starts a new game on startGame", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.letters).toEqual([]);
    expect(result.current.attempts).toBe(0);
  });

  it("increments attempts on confirmLetter", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.confirmLetter("z");
    });

    expect(result.current.attempts).toBe(1);
  });

  it("adds letter to letters list on first guess", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.confirmLetter("z");
    });

    expect(result.current.letters.length).toBe(1);
    expect(result.current.letters[0].value).toBe("Z");
  });

  it("does not add duplicate letter to letters list", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.confirmLetter("c");
    });

    const letterCount = result.current.letters.length;

    act(() => {
      result.current.confirmLetter("c");
    });

    expect(result.current.letters.length).toBe(letterCount);
    expect(result.current.attempts).toBe(2);
  });
});
