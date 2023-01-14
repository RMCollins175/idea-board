import React from "react";
import { useIdeaHook } from "../hooks/useIdea";
import { IdeaType } from "../types";

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

// export const IdeaContext = React.createContext<IdeaContextType>({});
export const IdeaContext = React.createContext({});

export const IdeaContextProvider = ({ children }: any) => {
  const { ideas, addIdea, updateIdea, deleteIdea } = useIdeaHook();

  const IdeaContextValue: IdeaContextType = {
    ideas,
    addIdea,
    updateIdea,
    deleteIdea
  };

  return (
    <IdeaContext.Provider value={IdeaContextValue}>
      {children}
    </IdeaContext.Provider>
  );
};
