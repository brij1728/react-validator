export type ParsedResult = {
  lineNumber: number;
  address: string;
  amount: number;
};

export type ErrorResult = {
  [lineNumber: number]: string[];
};

export type DuplicateAddressWarning = {
  [address: string]: number[];
};
