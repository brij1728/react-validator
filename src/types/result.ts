export type ParsedResult = {
  line_number: number;
  address: string;
  amount: string;
};

export type ErrorResult = {
  [lineNumber: number]: string[];
};
