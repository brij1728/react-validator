import { ErrorResult, ParsedResult } from "../../types";
import { combineBalances, keepFirstOne, parseAddresses } from "../../utils";
import { useEffect, useState } from "react";

import { ReactEditor } from "../../components";

export const Home = () => {
  const sampleInput = `
    0x1234567890123456789012345678901234567890 123.45
    0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef00 99.99
    `;

  console.log(parseAddresses(sampleInput));

  const [codeValue, setCodeValue] = useState(sampleInput);
  const [parsedResults, setParsedResults] = useState<ParsedResult[]>([]);
  const [errors, setErrors] = useState<ErrorResult>({});
  const [hasClickedNext, setHasClickedNext] = useState(false);

  useEffect(() => {
    if (hasClickedNext) {
      processUserInput();
    }
  }, [hasClickedNext]);

  const processUserInput = () => {
    const { parsed, errors } = parseAddresses(codeValue);
    console.log("Parsed Results after parsing:", parsed);

    if (Object.keys(errors).length === 0) {
      // Assuming that 'keepFirstOne' is the default operation and should be done first
      const deduplicatedResults = keepFirstOne(parsed);
      setParsedResults(combineBalances(deduplicatedResults));
    } else {
      setErrors(errors);
    }
  };

  const handleNextClick = () => {
    setHasClickedNext(true);
  };

  return (
    <div>
      <ReactEditor code={codeValue} setCode={setCodeValue} />
      <button onClick={handleNextClick}>Next</button>

      {hasClickedNext && Object.keys(errors).length > 0 && (
        <div>
          <h2>Errors:</h2>
          {Object.entries(errors).map(([line, errorList]) => (
            <p key={line}>
              Line {line}: {errorList.join(", ")}
            </p>
          ))}
        </div>
      )}

      {hasClickedNext && Object.keys(errors).length === 0 && (
        <div>
          <h2>Parsed Results:</h2>
          {parsedResults.map((result) => (
            <div key={result.line_number}>
              Line {result.line_number}: Address {result.address} with amount{" "}
              {result.amount}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
