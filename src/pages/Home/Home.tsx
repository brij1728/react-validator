import {
  DuplicateWarning,
  ErrorList,
  ParsedResults,
  ReactEditor,
} from "../../components";

import { useParsedData } from "../../hooks";
import { useState } from "react";

export const Home = () => {
  const sampleInput = `
0x1234567890123456789012345678901234567890 123.45
0xabcdefabcdefabcdefabcdefabcdefabcdffff00 99
`.trim();

  const [isEditing, setIsEditing] = useState(true);

  const {
    text,
    setText,
    parsedData,
    errors,
    duplicateWarnings,
    isValid,
    resetState,
    onSubmit,
    onHandleKeepFirstOne,
    onHandleCombineBalances,
  } = useParsedData(sampleInput, () => setIsEditing(false));

  return (
    <div>
      <ReactEditor
        code={text}
        setCode={(newText) => {
          setText(newText);
          setIsEditing(true);
          resetState();
        }}
      />

      {isEditing && <button onClick={onSubmit}>Next</button>}

      {duplicateWarnings && Object.keys(duplicateWarnings).length > 0 && (
        <DuplicateWarning
          warnings={duplicateWarnings}
          onKeepFirstOne={onHandleKeepFirstOne}
          onCombineBalances={onHandleCombineBalances}
        />
      )}

      {errors && Object.keys(errors).length > 0 && (
        <ErrorList errors={errors} />
      )}

      {isValid && <ParsedResults results={parsedData} />}
    </div>
  );
};
