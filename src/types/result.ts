export type ParsedResult = {
  line_number: number;
  address: string;
  amount: number;
};

export type ErrorResult = {
  [lineNumber: number]: string[];
};
