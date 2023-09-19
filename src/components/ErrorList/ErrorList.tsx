import { ErrorIcon, ErrorListContainer } from "./ErrorListStyles";

import { ErrorResult } from "../../types";
import React from "react";

interface Props {
  errors: ErrorResult;
}

export const ErrorList: React.FC<Props> = ({ errors }) => (
  <div>
    <h2>Errors:</h2>
    {Object.entries(errors).map(([line, errorList]) => (
      <ErrorListContainer key={line}>
        <ErrorIcon>!</ErrorIcon>
        <span>
          Line {line}: {errorList.join(", ")}
        </span>
      </ErrorListContainer>
    ))}
  </div>
);
