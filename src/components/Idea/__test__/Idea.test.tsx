import { Idea } from "../Idea";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// const IdeaProps = {
//   ideaTitle: "Title",
//   ideaDescription: "Description",
//   id: 123,
//   timestamp: 123456789,
//   addIdea: jest.fn(),
//   updateIdea: jest.fn(),
//   deleteIdea: jest.fn(),
// };

describe("Idea component tests", () => {
  it("should render a default Idea component form", () => {
    const IdeaForm = renderer.create(<Idea />).toJSON();
    expect(IdeaForm).toMatchSnapshot();
  });

  it("The add button becomes enabled when we start typing in the input text box", () => {
    render(<Idea />);
    // expect the add button to be disabled
    const addButton = screen.getByTestId("IdeaForm.buttonAdd");
    expect(addButton).toHaveAttribute("disabled");

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" }
    });
    expect(addButton).toBeEnabled();
  });

  it("should not allow more than 140 characters in the description", () => {
    render(<Idea />);
    const descriptionInput = screen.getByTestId("IdeaForm.description");
    const description = "a".repeat(140);

    userEvent.type(descriptionInput, description);
    expect(descriptionInput).toHaveValue(description);

    userEvent.type(descriptionInput, "a");
    expect(descriptionInput).toHaveValue(description);
  });
});
