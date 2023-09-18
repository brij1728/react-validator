import { ParsedResult } from "../../types";

export const combineBalances = (
  parsedResults: ParsedResult[]
): ParsedResult[] => {
  const combinedResults: { [address: string]: number } = {};

  for (const entry of parsedResults) {
    if (!combinedResults[entry.address]) {
      combinedResults[entry.address] = parseFloat(entry.amount);
    } else {
      combinedResults[entry.address] += parseFloat(entry.amount);
    }
  }

  // Convert the combined results back to the ParsedResult format
  const results: ParsedResult[] = [];
  for (const [address, amount] of Object.entries(combinedResults)) {
    results.push({
      line_number: -1, // Line number will not be accurate after combining balances
      address: address,
      amount: amount.toString(),
    });
  }

  return results;
};
