import { ParsedResult } from "../../types";

interface Props {
  results: ParsedResult[];
}

export const ParsedResults: React.FC<Props> = ({ results }) => (
  <div>
    <h2>Parsed Results:</h2>
    {results.map((result) => (
      <div key={result.lineNumber}>
        Send {result.amount} to address {result.address}
      </div>
    ))}
  </div>
);
