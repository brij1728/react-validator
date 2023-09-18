import { DuplicateAddressWarning, ErrorResult, ParsedResult } from "../types";
import { combineBalances, keepFirstOne, parseAddresses } from "../utils";
import { useCallback, useState } from "react";

export const useParsedData = (
  initialValue: string,
  onProcessedCallback?: () => void
) => {
  const [text, setText] = useState(initialValue);
  const [parsedData, setParsedData] = useState<ParsedResult[]>([]);
  const [errors, setErrors] = useState<ErrorResult | null>(null);
  const [duplicateWarnings, setDuplicateWarnings] =
    useState<DuplicateAddressWarning | null>(null);
  const [isValid, setIsValid] = useState(false);

  const resetState = useCallback(() => {
    setParsedData([]);
    setErrors(null);
    setDuplicateWarnings(null);
    setIsValid(false);
  }, []);

  const onSubmit = useCallback(() => {
    const { parsed, errors, duplicateWarnings } = parseAddresses(text);

    setParsedData(parsed);
    setErrors(errors);
    setDuplicateWarnings(duplicateWarnings);

    if (
      Object.keys(errors).length === 0 &&
      Object.keys(duplicateWarnings).length === 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    if (onProcessedCallback) {
      onProcessedCallback();
    }
  }, [text, onProcessedCallback]);

  const onHandleKeepFirstOne = useCallback(() => {
    const deduplicatedData = keepFirstOne(parsedData);
    const updatedText = deduplicatedData
      .map((result) => `${result.address} ${result.amount}`)
      .join("\n");

    setText(updatedText);
    setParsedData(deduplicatedData);
    setDuplicateWarnings(null);
    setIsValid(true);
  }, [parsedData]);

  const onHandleCombineBalances = useCallback(() => {
    const combinedData = combineBalances(parsedData);
    const updatedText = combinedData
      .map((result) => `${result.address} ${result.amount}`)
      .join("\n");

    setText(updatedText);
    setParsedData(combinedData);
    setDuplicateWarnings(null);
    setIsValid(true);
  }, [parsedData]);

  return {
    text,
    setText,
    parsedData,
    setParsedData,
    errors,
    setErrors,
    duplicateWarnings,
    setDuplicateWarnings,
    isValid,
    setIsValid,
    onSubmit,
    onHandleKeepFirstOne,
    onHandleCombineBalances,
    resetState,
  };
};
