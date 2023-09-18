import {
  ErrorResult,
  ParsedResult,
  DuplicateAddressWarning,
} from "../../types";
import { combineBalances, keepFirstOne, parseAddresses } from "../../utils";

import { ReactEditor } from "../../components";
import { useCallback, useState } from "react";

export const Home = () => {
  const sampleInput = `
0x1234567890123456789012345678901234567890 123.45
0xabcdefabcdefabcdefabcdefabcdefabcdffff00 99
`.trim();

  const [text, setText] = useState(sampleInput);
  const [parsedData, setParsedData] = useState<ParsedResult[]>([]);
  const [errors, setErrors] = useState<null | ErrorResult>(null);
  const [duplicateWarnings, setDuplicateWarnings] =
    useState<null | DuplicateAddressWarning>(null);

  const [isValid, setIsValid] = useState(false);

  const processUserInput = useCallback(() => {
    // reset state
    setParsedData([]);
    setErrors(null);
    setDuplicateWarnings(null);
    setIsValid(false);

    const { parsed, errors, duplicateWarnings } = parseAddresses(text);

    setParsedData(parsed);

    if (Object.keys(duplicateWarnings).length > 0) {
      setDuplicateWarnings(duplicateWarnings);
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    }

    if (
      Object.keys(errors).length === 0 &&
      Object.keys(duplicateWarnings).length === 0
    ) {
      setIsValid(true);
    }
  }, [text, setParsedData, setErrors, setDuplicateWarnings, setIsValid]);

  const recreatedInputFromParsedData = (data: ParsedResult[]) =>
    data
      .map((result) => {
        return `${result.address} ${result.amount}`;
      })
      .join("\n");

  const onSubmit = useCallback(() => {
    processUserInput();
  }, [processUserInput]);

  const onHandleKeepFirstOne = useCallback(() => {
    setText(recreatedInputFromParsedData(keepFirstOne(parsedData)));
    processUserInput();
  }, [parsedData, processUserInput]);

  const onHandleCombineBalances = useCallback(() => {
    setText(recreatedInputFromParsedData(combineBalances(parsedData)));
    processUserInput();
  }, [parsedData, processUserInput]);

  return (
    <div>
      <ReactEditor code={text} setCode={setText} />
      {duplicateWarnings && (
        <div>
          <h2>Duplicate Address Warnings:</h2>
          <button onClick={onHandleKeepFirstOne}>Keep First One</button>
          <button onClick={onHandleCombineBalances}>Combine Balance</button>
          {Object.entries(duplicateWarnings).map(([address, lineNumbers]) => (
            <p key={address}>
              Address {address} encountered duplicate in line:{" "}
              {lineNumbers.join(", ")}
            </p>
          ))}
        </div>
      )}
      <button onClick={onSubmit}>Next</button>

      {errors && Object.keys(errors).length > 0 && (
        <div>
          <h2>Errors:</h2>
          {Object.entries(errors).map(([line, errorList]) => (
            <p key={line}>
              Line {line}: {errorList.join(", ")}
            </p>
          ))}
        </div>
      )}

      {isValid && (
        <div>
          <h2>Parsed Results:</h2>
          {parsedData.map((result) => {
            console.log("Rendering result:", result);
            return (
              <div key={result.lineNumber}>
                Line {result.lineNumber}: Address {result.address} with amount{" "}
                {result.amount}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
