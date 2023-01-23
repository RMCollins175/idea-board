import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IdeaType } from "../utilities/types";
import { v4 as uuidv4 } from "uuid";

export interface IdeaContextType {
  ideaTitle?: string;
  ideaDescription?: string;
  id?: string;
  timestamp?: number;
  ideas: IdeaType[];
  addIdea: (title: string, description: string) => void;
  updateIdea: (id: string, title: string, description: string) => void;
  deleteIdea: (id: string) => void;
}

export const IdeaContext = React.createContext<IdeaContextType>({
  ideas: [],
  addIdea: () => {},
  updateIdea: () => {},
  deleteIdea: () => {}
});

export const IdeaContextProvider = ({ children }: any) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [ideasStorage, setIdeasStorage] = useLocalStorage("ideas", "[]");

  useEffect(() => {
    if (ideasStorage !== "[]") {
      setIdeas(JSON.parse(ideasStorage));
    }
  }, [ideasStorage]);

  const addIdea = (title: string, description: string) => {
    const newIdeas = [
      ...ideas,
      { title, description, timestamp: Date.now(), id: uuidv4() }
    ];
    setIdeas(newIdeas);
    setIdeasStorage(JSON.stringify(newIdeas));
  };

  const updateIdea = (id: string, title: string, description: string) => {
    const updatedIdeas = ideas.map((idea) => {
      if (idea.id === id) {
        return { ...idea, title, description, timestamp: Date.now() };
      }
      return idea;
    });
    setIdeas(updatedIdeas);
    setIdeasStorage(JSON.stringify(updatedIdeas));
  };

  const deleteIdea = (id: string) => {
    const filteredIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(filteredIdeas);
    setIdeasStorage(JSON.stringify(filteredIdeas));
  };

  return (
    <IdeaContext.Provider value={{ ideas, addIdea, updateIdea, deleteIdea }}>
      {children}
    </IdeaContext.Provider>
  );
};
