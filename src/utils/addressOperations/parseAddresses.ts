import {
  DuplicateAddressWarning,
  ErrorResult,
  ParsedResult,
} from "../../types";

export const parseAddresses = (
  input: string,
): {
  parsed: ParsedResult[];
  errors: ErrorResult;
  duplicateWarnings: DuplicateAddressWarning;
} => {
  const linePattern = /^(0x[a-f0-9]{40})(?:\s*[,=]\s*|\s+)(\d+(\.\d+)?)$/i;
  const addressPattern = /^0x[a-f0-9]{40}/i;
  const amountPattern = /\d+(\.\d+)?$/;

  const lines = input.split("\n");
  const parsedResults: ParsedResult[] = [];
  const errorResults: ErrorResult = {};
  const duplicateAddresses: { [address: string]: number[] } = {};

  lines.forEach((line, idx) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const lineNumber = idx + 1;
    const match = linePattern.exec(trimmedLine);
    if (match) {
      const address = match[1];
      const amount = parseFloat(match[2]);

      parsedResults.push({
        lineNumber: lineNumber,
        address: address,
        amount: amount,
      });

      if (!duplicateAddresses[address]) {
        duplicateAddresses[address] = [];
      }
      duplicateAddresses[address].push(lineNumber);
    } else {
      errorResults[lineNumber] = [];

      if (!addressPattern.test(trimmedLine)) {
        errorResults[lineNumber].push("invalid address");
      }

      if (!amountPattern.test(trimmedLine)) {
        errorResults[lineNumber].push("invalid amount");
      }

      if (errorResults[lineNumber].length === 0) {
        errorResults[lineNumber].push(
          "We are expecting a valid address and a valid amount separated by comma, space or =",
        );
      }
    }
  });

  const duplicateWarnings: DuplicateAddressWarning = {};
  Object.entries(duplicateAddresses).forEach(([address, lineNumbers]) => {
    if (lineNumbers.length > 1) {
      duplicateWarnings[address] = lineNumbers;
    }
  });

  return {
    parsed: parsedResults,
    errors: errorResults,
    duplicateWarnings: duplicateWarnings,
  };
};
