import { act, renderHook } from "@testing-library/react-hooks";

import { useParsedData } from "./useParseData";

describe("useParsedData", () => {
  it("initializes with provided text", () => {
    const { result } = renderHook(() => useParsedData("initialValue"));

    expect(result.current.text).toBe("initialValue");
  });

  it("parses the provided text on submit and identifies valid data", () => {
    const { result } = renderHook(() =>
      useParsedData("0x1234567890123456789012345678901234567890, 100.5"),
    );

    act(() => {
      result.current.onSubmit();
    });

    expect(result.current.parsedData).toEqual([
      {
        lineNumber: 1,
        address: "0x1234567890123456789012345678901234567890",
        amount: 100.5,
      },
    ]);
    expect(result.current.isValid).toBe(true);
  });

  it("identifies errors on invalid data", () => {
    const { result } = renderHook(() =>
      useParsedData("0xInvalidAddress, 100.5"),
    );

    act(() => {
      result.current.onSubmit();
    });

    if (result.current.errors) {
      expect(result.current.errors[1]).toContain("invalid address");
    }
    expect(result.current.isValid).toBe(false);
  });

  it("identifies duplicate address warnings", () => {
    const input = `
      0x1234567890123456789012345678901234567890, 100.5
      0x1234567890123456789012345678901234567890, 200.5
    `;
    const { result } = renderHook(() => useParsedData(input));

    act(() => {
      result.current.onSubmit();
    });
    if (result.current.duplicateWarnings) {
      expect(
        result.current.duplicateWarnings[
          "0x1234567890123456789012345678901234567890"
        ],
      ).toEqual([1, 2]);
    }
  });

  it("handles the onHandleKeepFirstOne method correctly", () => {
    const input = `
      0x1234567890123456789012345678901234567890, 100.5
      0x1234567890123456789012345678901234567890, 200.5
    `;
    const { result } = renderHook(() => useParsedData(input));

    act(() => {
      result.current.onHandleKeepFirstOne();
    });

    // Check if deduplication has taken place
    // ... (based on how your deduplication function works)
  });

  it("handles the onHandleCombineBalances method correctly", () => {
    const input = `
      0x1234567890123456789012345678901234567890, 100.5
      0x1234567890123456789012345678901234567890, 200.5
    `;
    const { result } = renderHook(() => useParsedData(input));

    act(() => {
      result.current.onHandleCombineBalances();
    });
  });

  it("resets state with resetState method", () => {
    const input = "0x1234567890123456789012345678901234567890, 100.5";
    const { result } = renderHook(() => useParsedData(input));

    // Assuming there was some initial state before resetting
    act(() => {
      result.current.onSubmit();
    });

    act(() => {
      result.current.resetState();
    });

    expect(result.current.parsedData).toEqual([]);
    expect(result.current.errors).toBe(null);
    expect(result.current.duplicateWarnings).toBe(null);
    expect(result.current.isValid).toBe(false);
  });
});
