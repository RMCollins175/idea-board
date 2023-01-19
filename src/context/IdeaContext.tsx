import React, { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IdeaType } from "../utilities/types";

export interface IdeaContextType {
  ideaTitle?: string;
  ideaDescription?: string;
  id?: number;
  timestamp?: number;
  ideas: IdeaType[];
  addIdea: (title: string, description: string) => void;
  updateIdea: (id: number, title: string, description: string) => void;
  deleteIdea: (id: number) => void;
}

export const IdeaContext = React.createContext<IdeaContextType>({
  ideas: [],
  addIdea: () => {},
  updateIdea: () => {},
  deleteIdea: () => {}
});

export const IdeaContextProvider = ({ children }: any) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [ideasStorage, setIdeasStorage] = useLocalStorage("ideas", "");

  useEffect(() => {
    setIdeas(ideasStorage ? JSON.parse(ideasStorage) : []);
  }, [ideasStorage]);

  const addIdea = (title: string, description: string) => {
    let id = 1;
    if (ideas.length > 0) {
      id = ideas[ideas.length - 1].id + 1;
    }
    const newIdeas = [
      ...ideas,
      { title, description, timestamp: Date.now(), id }
    ];
    setIdeas(newIdeas);
    setIdeasStorage(JSON.stringify(newIdeas));
  };

  const updateIdea = (id: number, title: string, description: string) => {
    const updatedIdeas = ideas.map((idea) => {
      if (idea.id === id) {
        return { ...idea, title, description, timestamp: Date.now() };
      }
      return idea;
    });
    setIdeas(updatedIdeas);
    setIdeasStorage(JSON.stringify(updatedIdeas));
  };

  const deleteIdea = (id: number) => {
    const filteredIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(filteredIdeas);
    setIdeasStorage(JSON.stringify(filteredIdeas));
  };

  // const IdeaContextValue = useMemo(
  //   () => ({ ideas, addIdea, updateIdea, deleteIdea }),
  //   [addIdea, deleteIdea, ideas, updateIdea]
  // );

  return (
    // <IdeaContext.Provider value={IdeaContextValue}>
    <IdeaContext.Provider value={{ ideas, addIdea, updateIdea, deleteIdea }}>
      {children}
    </IdeaContext.Provider>
  );
};
