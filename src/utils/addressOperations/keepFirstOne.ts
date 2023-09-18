import { ParsedResult } from "../../types";

export const keepFirstOne = (parsedResults: ParsedResult[]): ParsedResult[] => {
  const seenAddresses = new Set<string>();
  const results: ParsedResult[] = [];

  for (const entry of parsedResults) {
    if (!seenAddresses.has(entry.address)) {
      seenAddresses.add(entry.address);
      results.push(entry);
    }
  }

  return results;
};
