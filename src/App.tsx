import { CardList } from "./components/CardList/CardList";
import "./App.css";
import { IdeaContextProvider } from "./context/IdeaContext";
import { Card } from "./components/Card/Card";

const App = () => {
  return (
    <IdeaContextProvider>
      <main className="container">
        <h1 className="appTitle">Ideas Board</h1>
        <div className="ideasContainer">
          <Card />
          <CardList />
        </div>
      </main>
    </IdeaContextProvider>
  );
};

export default App;
