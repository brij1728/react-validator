import {
  DuplicateAddressWarning,
  ErrorResult,
  ParsedResult,
} from "../../types";
import { parseAddresses } from "./parseAddresses";

describe("parseAddresses", () => {
  it("should correctly parse valid lines", () => {
    const input = `0x1234567890123456789012345678901234567890, 100.5
0x0987654321098765432109876543210987654321 = 200`;

    const expectedParsed: ParsedResult[] = [
      {
        lineNumber: 1,
        address: "0x1234567890123456789012345678901234567890",
        amount: 100.5,
      },
      {
        lineNumber: 2,
        address: "0x0987654321098765432109876543210987654321",
        amount: 200,
      },
    ];

    const { parsed, errors, duplicateWarnings } = parseAddresses(input);

    expect(parsed).toEqual(expectedParsed);
    expect(errors).toEqual({});
    expect(duplicateWarnings).toEqual({});
  });

  it("should identify invalid lines", () => {
    const input = `0xInvalidAddress, 100.5
0x0987654321098765432109876543210987654321 = invalidAmount`;

    const expectedErrors: ErrorResult = {
      1: ["invalid address"],
      2: ["invalid amount"],
    };

    const { errors } = parseAddresses(input);

    expect(errors).toEqual(expectedErrors);
  });

  it("should add an error message for invalid lines with no specific errors", () => {
    const input = `0x1234567890123456789012345678901234567890?100.5
    0x1234567890123456789012345678901234567890-100.5
    0x0987654321098765432109876543210987654321>200`;

    const { errors } = parseAddresses(input);

    const expectedErrorMessages: ErrorResult = {
      1: [
        "We are expecting a valid address and a valid amount separated by comma, space or =",
      ],
      2: [
        "We are expecting a valid address and a valid amount separated by comma, space or =",
      ],
      3: [
        "We are expecting a valid address and a valid amount separated by comma, space or =",
      ],
    };

    expect(errors).toEqual(expectedErrorMessages);
  });

  it("should identify duplicate addresses", () => {
    const input = `0x1234567890123456789012345678901234567890, 100.5
0x1234567890123456789012345678901234567890 = 200`;

    const expectedDuplicateWarnings: DuplicateAddressWarning = {
      "0x1234567890123456789012345678901234567890": [1, 2],
    };

    const { duplicateWarnings } = parseAddresses(input);

    expect(duplicateWarnings).toEqual(expectedDuplicateWarnings);
  });

  it("should handle empty lines and trim spaces", () => {
    const input = `
0x1234567890123456789012345678901234567890, 100.5

0x0987654321098765432109876543210987654321 = 200
`;

    const expectedParsed: ParsedResult[] = [
      {
        lineNumber: 2,
        address: "0x1234567890123456789012345678901234567890",
        amount: 100.5,
      },
      {
        lineNumber: 4,
        address: "0x0987654321098765432109876543210987654321",
        amount: 200,
      },
    ];

    const { parsed, errors, duplicateWarnings } = parseAddresses(input);

    expect(parsed).toEqual(expectedParsed);
    expect(errors).toEqual({});
    expect(duplicateWarnings).toEqual({});
  });
});
