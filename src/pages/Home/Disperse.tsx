import {
  ButtonContainer,
  StyledButton,
  StyledContainer,
  StyledErrorContainer,
  StyledResultContainer,
  StyledWarningContainer,
} from "./DisperseStyles";
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

  const [showParsedResults, setShowParsedResults] = useState(false);

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
  } = useParsedData(sampleInput, () => setShowParsedResults(true));

  return (
    <StyledContainer>
      <ReactEditor
        code={text}
        setCode={(newText) => {
          setText(newText);
          resetState();
          setShowParsedResults(false);
        }}
        hint="Separated by ',' or ' ' or '='"
      />

      {errors && Object.keys(errors).length > 0 && (
        <StyledErrorContainer>
          <ErrorList errors={errors} />
        </StyledErrorContainer>
      )}

      {duplicateWarnings && Object.keys(duplicateWarnings).length > 0 && (
        <StyledWarningContainer>
          <DuplicateWarning
            warnings={duplicateWarnings}
            onKeepFirstOne={onHandleKeepFirstOne}
            onCombineBalances={onHandleCombineBalances}
          />
        </StyledWarningContainer>
      )}

      {showParsedResults && isValid && (
        <StyledResultContainer>
          <ParsedResults results={parsedData} />
        </StyledResultContainer>
      )}
      <ButtonContainer>
        <StyledButton onClick={onSubmit} className={`${isValid && "valid"}`}>
          Next
        </StyledButton>
      </ButtonContainer>
    </StyledContainer>
  );
};
