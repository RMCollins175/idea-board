import React from "react";
import { Idea } from "./components/Idea/Idea";
import { IdeaList } from "./components/IdeaList/IdeaList";
import "./App.css";
import { IdeaContextProvider } from "./utilities/context/IdeaContext";

const App = () => {
  return (
    <main className="container">
      <h1 className="appTitle">Ideas Board</h1>
      <div className="ideasContainer">
        <IdeaContextProvider>
          <Idea />
          <IdeaList />
        </IdeaContextProvider>
      </div>
    </main>
  );
};

export default App;
