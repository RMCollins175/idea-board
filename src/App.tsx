import { CardList } from "./components/CardList/CardList";
import "./App.css";
import { IdeaContextProvider } from "./context/IdeaContext";
import { Card } from "./components/Card/Card";

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
        <Card />
        <CardList />
      </AppContainer>
    </IdeaContextProvider>
  );
};

export default App;
