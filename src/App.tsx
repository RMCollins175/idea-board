import { Idea } from "./components/Idea/Idea";
import { IdeaList } from "./components/IdeaList/IdeaList";
import "./App.css";
import { IdeaContextProvider } from "./context/IdeaContext";

const AppContainer = ({ children }: any) => {
  return (
    <main className="container">
      <h1 className="appTitle">Ideas Board</h1>
      <div className="ideasContainer">{children}</div>
    </main>
  );
};

const App = () => {
  return (
    <IdeaContextProvider>
      <AppContainer>
        <Idea />
        <IdeaList />
      </AppContainer>
    </IdeaContextProvider>
  );
};

export default App;
