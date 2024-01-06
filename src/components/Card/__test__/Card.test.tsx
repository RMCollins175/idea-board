import { Card } from "../Card";
import {
  act,
  findAllByTestId,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { IdeaType } from "../../../utilities/types";
import { IdeaContext } from "../../../context/IdeaContext";
import App from "../../../App";

describe("Card component tests", () => {
  let idea: IdeaType = {
    id: "1",
    title: "Example idea",
    description: "Example description",
    timestamp: 1675762200000
  };

  const dispatch = jest.fn();
  const ideas = [idea];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // https://testing-library.com/docs/react-testing-library/setup/
  // pass in value and pass to context
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

  it("should render the form with the correct inputs and labels when no idea is passed", () => {
    renderCardWithIdea();

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("should render the card correctly when ideas are passed", () => {
    renderCardWithIdea();

    expect(screen.getByLabelText("Example idea")).toBeInTheDocument();
    expect(screen.getByLabelText("Example description")).toBeInTheDocument();
  });

  it("should display the timestamp with the correct format", () => {
    renderCardWithIdea();
    const timestamp = screen.getByText("2023-02-07 - 09:30:00");
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
    // expect(deleteButton).toBeInTheDocument(); // redundant as above will error

    fireEvent.click(deleteButton); // use the userEvent as per the docs
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
    // expect(resetButton).toBeInTheDocument();// redundant

    const ideaTitle = "Test Title";

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: ideaTitle }
    });
    // user.type(screen.getByPlaceholderText("Title"), 'Test Title')
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Description" }
    });

    // thinking about if you could get getByText working
    expect(screen.getByPlaceholderText("Title")).toHaveValue(ideaTitle);
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "Test Description"
    );

    fireEvent.click(resetButton);

    //maybe between to use .not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Title")).toHaveValue("");
    });
    await waitFor(() => {
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

  it("snapshot test of Card", () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });

  it("snapshot test of Card with ideas", () => {
    const { asFragment } = render(<Card idea={idea} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
