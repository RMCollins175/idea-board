import { Card } from "../Card";
import renderer from "react-test-renderer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { format } from "date-fns";
import { act } from "react-dom/test-utils";
import { IdeaType } from "../../../utilities/types";
import { IdeaContext } from "../../../context/IdeaContext";

describe("Idea component tests", () => {
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

  it("should submit the form and call the handleSubmission function with the correct data", async () => {
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
