import { render, screen } from "@testing-library/react";
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

  it("should correctly map over the ideas in the context", () => {
    renderCardList();

    // 2 title intputs and 2 description inputs = 4 in total
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("maps over a list of cards and renders those cards", () => {
    renderCardList();

    ideas.forEach((idea) => {
      expect(screen.getByText(idea.title)).toBeInTheDocument();
      expect(screen.getByText(idea.description)).toBeInTheDocument();
    });
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
});
