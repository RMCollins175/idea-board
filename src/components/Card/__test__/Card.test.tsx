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

  const renderCardWithIdea = () =>
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card idea={idea} />
      </IdeaContext.Provider>
    );

  const renderCardFormNoIdea = () =>
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card />
      </IdeaContext.Provider>
    );

  it("should render the form with the correct inputs and labels", () => {
    renderCardWithIdea();

    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it("should display the timestamp with the correct format", () => {
    renderCardWithIdea();
    const timestamp = screen.getByText(
      format(new Date(idea.timestamp), "yyyy-MM-dd - HH:mm:ss")
    );
    expect(timestamp).toBeInTheDocument();
  });

  it("should render the 'Add' button when no idea is passed as a prop", () => {
    renderCardFormNoIdea();
    const addButton = screen.getByText("Add");
    expect(addButton).toBeInTheDocument();
  });

  it("should have a 'Delete' button and be able to delete an idea when clicked", async () => {
    renderCardWithIdea();

    const deleteButton = screen.getByText("Delete");
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
    renderCardFormNoIdea();

    const resetButton = screen.getByText("Reset");
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
    renderCardWithIdea();

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

  it("should delete the idea when the delete button is clicked", async () => {
    const idea: IdeaType = {
      id: "2",
      title: "Example delete idea",
      description: "Example delete description",
      timestamp: Date.now()
    };

    const ideas = [idea];

    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <Card idea={idea} />
      </IdeaContext.Provider>
    );

    expect(ideas.length).toBe(1);
    console.log(ideas);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "DELETE_IDEA",
        payload: {
          id: idea.id
        }
      });
    });
    expect(ideas.length).toBe(0);
    console.log(ideas);
  });

  // it("should add the idea when the add button is clicked", async () => {
  //   const { getByText } = render(
  //     <IdeaContext.Provider value={{ dispatch, ideas }}>
  //       <Card idea={idea} />
  //     </IdeaContext.Provider>
  //   );
  //   const titleInput = screen.getByPlaceholderText("Title");
  //   const descriptionInput = screen.getByPlaceholderText("Description");
  //   expect(ideas.length).toBe(0);
  //   fireEvent.change(titleInput, { target: { value: "title" } });
  //   fireEvent.change(descriptionInput, { target: { value: "description" } });
  //   fireEvent.click(getByText("Add"));
  //   await waitFor(() => {
  //     expect(ideas.length).toBe(1);
  //   });
  // });

  it("should render a default Idea component form", () => {
    const CardForm = renderer.create(<Card />).toJSON();
    expect(CardForm).toMatchSnapshot();
  });
});
