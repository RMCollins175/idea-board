import { Card } from "../Card";
import renderer from "react-test-renderer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IdeaType } from "../../../utilities/types";
import { IdeaContext } from "../../../context/IdeaContext";
import { format } from "date-fns";

describe("Card component tests", () => {
  let idea: IdeaType = {
    id: "1",
    title: "Example idea",
    description: "Example description",
    timestamp: Date.now()
  };

  const dispatch = jest.fn();
  const ideas = [idea];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form with the correct inputs and labels", () => {
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card idea={idea} />
      </IdeaContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it("should display the timestamp with the correct format", () => {
    const { getByText } = render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card idea={idea} />
      </IdeaContext.Provider>
    );
    const timestamp = getByText(
      format(new Date(idea.timestamp), "yyyy-MM-dd - HH:mm:ss")
    );
    expect(timestamp).toBeInTheDocument();
  });

  it("should render the 'Add' button when no idea is passed as a prop", () => {
    render(<Card />);
    const addButton = screen.getByText("Add");
    expect(addButton).toBeInTheDocument();
  });

  it("should have a 'Delete' button and be able to delete an idea when clicked", async () => {
    const { getByText } = render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card idea={idea} />
      </IdeaContext.Provider>
    );

    const deleteButton = getByText("Delete");
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "DELETE_IDEA",
        payload: {
          id: idea.id
        }
      });
    });
  });

  it("should have a 'Reset' button and be able to reset the form when clicked", async () => {
    const { getByText } = render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card />
      </IdeaContext.Provider>
    );

    const resetButton = getByText("Reset");
    expect(resetButton).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Title" }
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Description" }
    });

    expect(screen.getByPlaceholderText("Title")).toHaveValue("Test Title");
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "Test Description"
    );

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Title")).toHaveValue("");
      expect(screen.getByPlaceholderText("Description")).toHaveValue("");
    });
  });

  it("should submit the form, call handleSubmission function and update card with the correct data", async () => {
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card idea={idea} />
      </IdeaContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const submitButton = screen.getByText("Update");

    fireEvent.change(titleInput, { target: { value: "New title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New description" }
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "UPDATE_IDEA",
        payload: {
          id: idea.id,
          title: "New title",
          description: "New description"
        }
      });
    });
  });

  it("should render a default Idea component form", () => {
    const CardForm = renderer.create(<Card />).toJSON();
    expect(CardForm).toMatchSnapshot();
  });
});
