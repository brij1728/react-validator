import { DuplicateAddressWarning } from "../../types";

interface Props {
  warnings: DuplicateAddressWarning;
  onKeepFirstOne: () => void;
  onCombineBalances: () => void;
}

export const DuplicateWarning: React.FC<Props> = ({
  warnings,
  onKeepFirstOne,
  onCombineBalances,
}) => (
  <div>
    <h2>Duplicate Address Warnings:</h2>
    <button onClick={onKeepFirstOne}>Keep First One</button>
    <button onClick={onCombineBalances}>Combine Balance</button>
    {Object.entries(warnings).map(([address, lineNumbers]) => (
      <p key={address}>
        Address {address} encountered duplicate in line:{" "}
        {lineNumbers.join(", ")}
      </p>
    ))}
  </div>
);
