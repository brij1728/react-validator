import { ParsedResult } from "../../types";

export const combineBalances = (
  parsedResults: ParsedResult[]
): ParsedResult[] => {
  const combinedResults: {
    [address: string]: { amount: number; line: number };
  } = {};

  for (const entry of parsedResults) {
    if (!combinedResults[entry.address]) {
      combinedResults[entry.address] = {
        amount: entry.amount,
        line: entry.lineNumber,
      };
    } else {
      combinedResults[entry.address].amount += entry.amount;
    }
  }

  const results: ParsedResult[] = [];
  for (const [address, details] of Object.entries(combinedResults)) {
    results.push({
      lineNumber: details.line,
      address: address,
      amount: details.amount,
    });
  }

  return results;
};
