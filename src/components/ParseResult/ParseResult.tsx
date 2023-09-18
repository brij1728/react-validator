import { ParsedResult } from "../../types";

interface Props {
  results: ParsedResult[];
}

export const ParsedResults: React.FC<Props> = ({ results }) => (
  <div>
    <h2>Parsed Results:</h2>
    {results.map((result) => (
      <div key={result.lineNumber}>
        Line {result.lineNumber}: Address {result.address} with amount{" "}
        {result.amount}
      </div>
    ))}
  </div>
);
