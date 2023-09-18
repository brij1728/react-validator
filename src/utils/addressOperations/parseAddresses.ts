import { ErrorResult, ParsedResult } from "../../types";

export const parseAddresses = (
  input: string
): {
  parsed: ParsedResult[];
  errors: ErrorResult;
} => {
  const addressPattern = /(0x[a-fA-F0-9]{40})/i; // Made it case-insensitive
  const amountPattern = /(\b\d+(\.\d+)?\b)/g;

  const lines = input.split("\n");
  const parsedResults: ParsedResult[] = [];
  const errorResults: ErrorResult = {};

  lines.forEach((line, idx) => {
    if (!line.trim()) return;

    const lineNumber = idx + 1;
    const addressMatch = addressPattern.exec(line);
    const amountMatches = Array.from(line.matchAll(amountPattern));
    const amountMatch = amountMatches.length
      ? amountMatches[amountMatches.length - 1]
      : null;

    // If neither an address nor an amount is found, log both errors
    if (!addressMatch && !amountMatch) {
      errorResults[lineNumber] = ["wrong address", "wrong amount"];
      return;
    }

    // Check for missing address
    if (!addressMatch) {
      errorResults[lineNumber] = errorResults[lineNumber] || [];
      errorResults[lineNumber].push("wrong address");
    }

    // Check for missing amount
    if (!amountMatch) {
      errorResults[lineNumber] = errorResults[lineNumber] || [];
      errorResults[lineNumber].push("wrong amount");
    }

    if (addressMatch && amountMatch) {
      parsedResults.push({
        line_number: lineNumber,
        address: addressMatch[1],
        amount: amountMatch[1],
      });
    }
  });

  return {
    parsed: parsedResults,
    errors: errorResults,
  };
};
