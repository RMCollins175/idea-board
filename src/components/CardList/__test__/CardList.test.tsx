import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IdeaContext } from "../../../context/IdeaContext";
import { CardList } from "../CardList";
import { IdeaType } from "../../../utilities/types";

describe("CardList tests", () => {
  const dispatch = jest.fn();
  const ideas: IdeaType[] = [
    {
      id: "1",
      title: "First idea",
      description: "This is the first idea",
      timestamp: Date.now()
    },
    {
      id: "2",
      title: "Second idea",
      description: "This is the second idea",
      timestamp: Date.now()
    }
  ];

  const renderCardList = () =>
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <CardList />
      </IdeaContext.Provider>
    );

  it("should render correctly", () => {
    renderCardList();

    expect(screen.getByLabelText("First idea")).toBeInTheDocument();
    expect(screen.getByLabelText("Second idea")).toBeInTheDocument();
  });

  it("should correctly map over the ideas in the context", () => {
    renderCardList();

    // 2 title intputs and 2 description inputs = 4 in total
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("should correctly pass the idea prop to each Card component", () => {
    renderCardList();

    // @ts-ignore
    expect(screen.getAllByPlaceholderText("Title").at(0).value).toBe(
      "First idea"
    );
    // @ts-ignore
    expect(screen.getAllByPlaceholderText("Title").at(1).value).toBe(
      "Second idea"
    );
  });

  it("should render correctly when there are no ideas in the context", () => {
    const ideas: any = [];
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <CardList />
      </IdeaContext.Provider>
    );

    expect(screen.getByTestId("cardlistContainer")).toBeInTheDocument();
    expect(screen.queryByTestId("card-component")).toBeNull();
  });

  // it("should add the idea when the add button is clicked", async () => {
  //   renderCardList();
  //   const titleInput = screen.getByPlaceholderText("Title");
  //   const descriptionInput = screen.getByPlaceholderText("Description");
  //   const addButton = screen.getByText("Add");

  //   // Get the number of "Title" labels before the button is clicked
  //   const beforeTitleCount = screen.getAllByText("Title").length;

  //   fireEvent.change(titleInput, { target: { value: "New Title" } });
  //   fireEvent.change(descriptionInput, {
  //     target: { value: "New Description" }
  //   });

  //   fireEvent.click(addButton);
  //   await waitFor(() => {
  //     // Get the number of "Title" labels after the button is clicked
  //     const afterTitleCount = screen.getAllByText("Title").length;

  //     // Expect the number of "Title" labels to have increased by 1
  //     expect(afterTitleCount).toBe(beforeTitleCount + 1);
  //   });
  // });
});
