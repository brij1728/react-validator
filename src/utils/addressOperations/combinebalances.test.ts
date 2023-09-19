import { ParsedResult } from "../../types";
import { combineBalances } from "./combinebalances";

describe("combineBalances", () => {
  it("should return the same array for unique addresses", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 2, address: "address2", amount: 200 },
    ];

    const result = combineBalances(input);

    expect(result).toEqual(input);
  });

  it("should combine amounts for duplicate addresses", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 2, address: "address1", amount: 200 },
      { lineNumber: 3, address: "address2", amount: 300 },
    ];

    const expected: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 300 },
      { lineNumber: 3, address: "address2", amount: 300 },
    ];

    const result = combineBalances(input);

    expect(result).toEqual(expected);
  });

  it("should return an array of objects with correct shape", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
    ];

    const result = combineBalances(input);

    expect(result[0]).toHaveProperty("lineNumber");
    expect(result[0]).toHaveProperty("address");
    expect(result[0]).toHaveProperty("amount");
  });
});
