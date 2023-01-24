import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IdeaContext } from "../../../context/IdeaContext";
import { CardList } from "../CardList";
import { IdeaType } from "../../../utilities/types";

describe("CardList", () => {
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

  // it("should render correctly", () => {
  //   render(
  //     <IdeaContext.Provider value={{ dispatch, ideas }}>
  //       <CardList />
  //     </IdeaContext.Provider>
  //   );

  //   expect(screen.getByText("First idea")).toBeInTheDocument();
  //   expect(screen.getByText("Second idea")).toBeInTheDocument();
  // });

  it("should correctly map over the ideas in the context", () => {
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <CardList />
      </IdeaContext.Provider>
    );

    expect(screen.getAllByRole("textbox").length).toBe(4);
    // expect(screen.getAllByLabelText("First idea").length).toBe(1);
  });

  it("should correctly pass the idea prop to each Card component", () => {
    render(
      <IdeaContext.Provider value={{ dispatch, ideas }}>
        <CardList />
      </IdeaContext.Provider>
    );

    expect(screen.getAllByPlaceholderText("Title").at(0).value).toBe(
      "First idea"
    );
    expect(screen.getAllByPlaceholderText("Title").at(1).value).toBe(
      "Second idea"
    );
  });

  it("should render correctly when there are no ideas in the context", () => {
    render(
      <IdeaContext.Provider value={{ dispatch, ideas: [] }}>
        <CardList />
      </IdeaContext.Provider>
    );

    expect(screen.queryByText("First idea")).toBeNull();
    expect(screen.queryByText("Second idea")).toBeNull();
  });
});
