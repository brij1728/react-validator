import { ParsedResult } from "../../types";
import { keepFirstOne } from "./keepFirstOne";

describe("keepFirstOne", () => {
  it("should return the same array for unique addresses", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 2, address: "address2", amount: 200 },
    ];

    const result = keepFirstOne(input);

    expect(result).toEqual(input);
  });

  it("should return only the first entry for duplicate addresses", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 2, address: "address1", amount: 200 },
      { lineNumber: 3, address: "address2", amount: 300 },
      { lineNumber: 4, address: "address2", amount: 400 },
    ];

    const expected: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 3, address: "address2", amount: 300 },
    ];

    const result = keepFirstOne(input);

    expect(result).toEqual(expected);
  });

  it("should return an array with no duplicate addresses", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 2, address: "address1", amount: 200 },
      { lineNumber: 3, address: "address2", amount: 300 },
      { lineNumber: 4, address: "address2", amount: 400 },
    ];

    const result = keepFirstOne(input);
    const addresses = result.map((entry) => entry.address);
    const uniqueAddresses = Array.from(new Set(addresses));

    expect(addresses.length).toEqual(uniqueAddresses.length);
  });

  it("should return an array of objects with correct shape", () => {
    const input: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
    ];

    const result = keepFirstOne(input);

    expect(result[0]).toHaveProperty("lineNumber");
    expect(result[0]).toHaveProperty("address");
    expect(result[0]).toHaveProperty("amount");
  });
});
