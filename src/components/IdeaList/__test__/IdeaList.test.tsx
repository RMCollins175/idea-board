import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IdeaList } from "../IdeaList";

const IdeaListProps = {
  ideas: [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      timestamp: 123456789
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      timestamp: 123456789
    }
  ]
};

// describe("Idea component tests", () => {
//   it("should render a list of Ideas", () => {
//     // snapshot for a list of ideas of length 2
//     const IdeaListComponent = renderer
//       .create(<IdeaList {...IdeaListProps} />)
//       .toJSON();
//     expect(IdeaListComponent).toMatchSnapshot();
//   });
// });
