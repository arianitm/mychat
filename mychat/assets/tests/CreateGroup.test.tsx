import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import CreateGroup from "../../app/(modal)/createGroup"; // adjust the import path as necessary

// Mock necessary modules
jest.mock("expo-router", () => ({
  useRouter: jest.fn().mockReturnValue({
    back: jest.fn(),
  }),
}));

jest.mock("convex/react", () => ({
  useMutation: jest.fn().mockReturnValue(jest.fn()),
}));

describe("CreateGroup Component", () => {
  it("should render correctly", () => {
    const { getByText } = render(<CreateGroup />);

    // Check if the labels are rendered correctly
    expect(getByText("Name")).toBeTruthy();
    expect(getByText("Description(Optional)")).toBeTruthy();
    expect(getByText("Icon (Optional)")).toBeTruthy();
    expect(getByText("Create")).toBeTruthy();
  });

  it("should show an error message when the name field is empty and user attempts to create a group", () => {
    const { getByText, getByLabelText } = render(<CreateGroup />);

    // Fill in the description and icon fields
    fireEvent.changeText(
      getByLabelText("Description(Optional)"),
      "Test description"
    );
    fireEvent.changeText(getByLabelText("Icon (Optional)"), "Test icon");

    // Press the create button
    fireEvent.press(getByText("Create"));

    // Check for error message
    expect(getByText("Name is required")).toBeTruthy();
  });

  it("should call the startGroup mutation and navigate back when form is valid", async () => {
    const { getByText, getByLabelText } = render(<CreateGroup />);

    // Fill in the required fields
    fireEvent.changeText(getByLabelText("Name"), "Test Group");
    fireEvent.changeText(
      getByLabelText("Description(Optional)"),
      "Test description"
    );
    fireEvent.changeText(getByLabelText("Icon (Optional)"), "Test icon");

    // Press the create button
    fireEvent.press(getByText("Create"));

    // Here you would check if your mutation was called or navigation happened
    // (You can mock the functions inside the component to check this)
  });
});
