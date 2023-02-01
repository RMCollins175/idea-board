This is a attempt at the ClearScore Tech Test Idea Board. I started it from scratch.

### Project Indigo Charlie

This app is a CRA. I used standard css stylesheets for styling. For testing, I used `jest` and `react-testing-library`. You can view this project at https://idea-board-one.vercel.app

Alternatively, you can clone this repo and run the following scripts:

- `yarn` to install dependencies
- `yarn dev` to run the local server and view in http://localhost:3000/
- `yarn test` to run the unit and integration tests

## Notes

I would have liked to spend more time on this but my time was limited. Here are some considerations and things I would have liked to do with more time:

- with more time would have added more tests
- add decent erorr states if local storage is not available
- tried tailwind or some other styling framework or generally just improved the styling, maybe dark mode.

## Requirements

- [x] A user should be able to add a new idea to the board
- [x] A user should be able to edit an existing idea
- [x] A user should be able to delete an idea
- [x] A user should see the time the idea was created
- [x] Should save ideas to local storage
