import { ParsedResult } from "../../types";

interface Props {
  results: ParsedResult[];
}

export const ParsedResults: React.FC<Props> = ({ results }) => (
  <div>
    <h2>Parsed Results:</h2>
    {results.length === 0 && <div>No results to display.</div>}
    {results.map((result) => (
      <div key={result.lineNumber}>
        Send {result.amount} to address {result.address}
      </div>
    ))}
  </div>
);
