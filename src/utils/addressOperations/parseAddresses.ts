import { ErrorResult, ParsedResult } from "../../types";

export const parseAddresses = (
  input: string
): {
  parsed: ParsedResult[];
  errors: ErrorResult;
} => {
  const addressPattern = /(0x[a-fA-F0-9]{40})/;
  const amountPattern = /(\d+\.\d+)/;
  const lines = input.split("\n").filter((line) => line.trim() !== ""); // Ignore empty lines

  const parsedResults: ParsedResult[] = [];
  const errorResults: ErrorResult = {};

  lines.forEach((line, idx) => {
    const lineNumber = idx + 1;

    let hasError = false;

    const addressMatch = addressPattern.exec(line);
    const amountMatch = amountPattern.exec(line);

    console.log(`addressMatch: ${addressMatch}`);
    console.log(`amountMatch: ${amountMatch}`);

    if (!addressMatch) {
      if (!errorResults[lineNumber]) {
        errorResults[lineNumber] = [];
      }
      errorResults[lineNumber].push("wrong address");
      hasError = true;
    }

    if (!amountMatch) {
      if (!errorResults[lineNumber]) {
        errorResults[lineNumber] = [];
      }
      errorResults[lineNumber].push("wrong amount");
      hasError = true;
    }

    if (!hasError) {
      parsedResults.push({
        line_number: lineNumber,
        address: addressMatch![1],
        amount: amountMatch![1],
      });
    }
  });

  console.log(parsedResults);
  return {
    parsed: parsedResults,
    errors: errorResults,
  };
};
