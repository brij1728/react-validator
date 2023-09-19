import { ErrorResult } from "../../types";
import React from "react";

interface Props {
  errors: ErrorResult;
}

export const ErrorList: React.FC<Props> = ({ errors }) => (
  <div>
    <h2>Errors:</h2>
    {Object.entries(errors).map(([line, errorList]) => (
      <div
        key={line}
        style={{
          display: "flex",
          alignItems: "center",
          border: "2px solid red",
          padding: "8px",
          margin: "8px 0",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "red",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
          }}
        >
          !
        </div>
        <span>
          Line {line}: {errorList.join(", ")}
        </span>
      </div>
    ))}
  </div>
);
