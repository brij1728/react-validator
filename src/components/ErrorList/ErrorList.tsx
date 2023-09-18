import { ErrorResult } from "../../types";

interface Props {
  errors: ErrorResult;
}

export const ErrorList: React.FC<Props> = ({ errors }) => (
  <div>
    <h2>Errors:</h2>
    {Object.entries(errors).map(([line, errorList]) => (
      <p key={line}>
        Line {line}: {errorList.join(", ")}
      </p>
    ))}
  </div>
);
