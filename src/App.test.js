import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders interest points title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Interest Points/i);
  expect(linkElement).toBeInTheDocument();
});
