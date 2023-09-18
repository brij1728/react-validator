import { ErrorResult, ParsedResult } from "../../types";
import { combineBalances, keepFirstOne, parseAddresses } from "../../utils";

import { ReactEditor } from "../../components";
import { useState } from "react";

export const Home = () => {
  const sampleInput = `
0x1234567890123456789012345678901234567890 123.45
0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef00 99
`.trim();

  const [text, setText] = useState(sampleInput);
  const [parsedResults, setParsedResults] = useState<ParsedResult[]>([]);
  const [errors, setErrors] = useState<ErrorResult>({});

  const processUserInput = () => {
    // reset state
    setParsedResults([]);
    setErrors({});

    const { parsed, errors } = parseAddresses(text);

    if (Object.keys(errors).length === 0) {
      // If there are duplicate addresses, first combine their balances
      const combinedResults = combineBalances(parsed);

      // Then, ensure only the first occurrence is kept
      const deduplicatedResults = keepFirstOne(combinedResults);

      setParsedResults(deduplicatedResults);
    } else {
      setErrors(errors);
      console.log(errors);
    }
  };

  const handleNextClick = () => {
    processUserInput();
  };

  return (
    <div>
      <ReactEditor code={text} setCode={setText} />
      <button onClick={handleNextClick}>Next</button>

      {Object.keys(errors).length > 0 && (
        <div>
          <h2>Errors:</h2>
          {Object.entries(errors).map(([line, errorList]) => (
            <p key={line}>
              Line {line}: {errorList.join(", ")}
            </p>
          ))}
        </div>
      )}

      {Object.keys(errors).length === 0 && (
        <div>
          <h2>Parsed Results:</h2>
          {parsedResults.map((result) => {
            console.log("Rendering result:", result);
            return (
              <div key={result.line_number}>
                Line {result.line_number}: Address {result.address} with amount{" "}
                {result.amount}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
