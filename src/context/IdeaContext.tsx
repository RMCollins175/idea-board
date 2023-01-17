import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setIdeas(JSON.parse(localStorage.getItem("ideas") || "[]"));
  }, []);

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
    localStorage.setItem("ideas", JSON.stringify(newIdeas));
  };

  const updateIdea = (id: number, title: string, description: string) => {
    const updatedIdeas = ideas.map((idea) => {
      if (idea.id === id) {
        return { ...idea, title, description, timestamp: Date.now() };
      }
      return idea;
    });
    setIdeas(updatedIdeas);
    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
  };

  const deleteIdea = (id: number) => {
    const filteredIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(filteredIdeas);
    localStorage.setItem("ideas", JSON.stringify(filteredIdeas));
  };

  return (
    <IdeaContext.Provider value={{ ideas, addIdea, updateIdea, deleteIdea }}>
      {children}
    </IdeaContext.Provider>
  );
};
