import { render, screen } from "@testing-library/react";

import { ParsedResult } from "../../types";
import { ParsedResults } from "./ParsedResults";

describe("ParsedResults", () => {
  it("renders the list of parsed results correctly", () => {
    const results: ParsedResult[] = [
      { lineNumber: 1, address: "address1", amount: 100 },
      { lineNumber: 2, address: "address2", amount: 200 },
    ];

    render(<ParsedResults results={results} />);

    // Check if the component renders the correct elements and text
    expect(screen.getByText("Parsed Results:")).toBeInTheDocument();
    expect(
      screen.getByText("Send 100 to address address1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Send 200 to address address2")
    ).toBeInTheDocument();
  });

  it("renders no results message when there are no results", () => {
    const results: ParsedResult[] = [];

    render(<ParsedResults results={results} />);

    // Check if the component renders a message when there are no results
    expect(screen.getByText("Parsed Results:")).toBeInTheDocument();
    expect(screen.getByText("No results to display.")).toBeInTheDocument();
  });
});
