import React, { useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IdeaType } from "../utilities/types";
import { v4 as uuidv4 } from "uuid";

export interface IdeaContextType {
  ideaTitle?: string;
  ideaDescription?: string;
  id?: string;
  timestamp?: number;
  ideas: IdeaType[];
  // addIdea: (title: string, description: string) => void;
  // updateIdea: (id: string, title: string, description: string) => void;
  // deleteIdea: (id: string) => void;
  dispatch: React.Dispatch<any>;
}

export const IdeaContext = React.createContext<IdeaContextType>({
  ideas: [],
  dispatch: () => {}
});

const ACTIONS = {
  ADD_IDEA: "ADD_IDEA",
  UPDATE_IDEA: "UPDATE_IDEA",
  DELETE_IDEA: "DELETE_IDEA"
};

export const IdeaContextProvider = ({ children }: any) => {
  const reducer = (state: IdeaType[], action: any) => {
    switch (action.type) {
      case ACTIONS.ADD_IDEA:
        return [
          ...state,
          {
            title: action.payload.title,
            description: action.payload.description,
            timestamp: Date.now(),
            id: uuidv4()
          }
        ];
      case ACTIONS.UPDATE_IDEA:
        return state.map((idea) => {
          if (idea.id === action.payload.id) {
            return {
              ...idea,
              title: action.payload.title,
              description: action.payload.description,
              timestamp: Date.now()
            };
          }
          return idea;
        });
      case ACTIONS.DELETE_IDEA:
        return state.filter((idea) => idea.id !== action.payload.id);
      default:
        return state;
    }
  };

  const [ideas, dispatch] = useReducer(reducer, []);
  // const [ideasStorage, setIdeasStorage] = useLocalStorage("ideas", "[]");

  // useEffect(() => {
  //   if (ideasStorage && typeof ideasStorage === "string") {
  //     setIdeas(JSON.parse(ideasStorage));
  //   }
  // }, [ideasStorage]);

  // const setIdeasAndSaveToStorage = (ideas: IdeaType[]) => {
  //   setIdeas(ideas);
  //   // setIdeasStorage(JSON.stringify(ideas));
  // };

  // const addIdea = (title: string, description: string) => {
  //   const newIdeas = [
  //     ...ideas,
  //     { title, description, timestamp: Date.now(), id: uuidv4() }
  //   ];
  //   setIdeasAndSaveToStorage(newIdeas);
  // };

  // const updateIdea = (id: string, title: string, description: string) => {
  //   const updatedIdeas = ideas.map((idea) => {
  //     if (idea.id === id) {
  //       return { ...idea, title, description, timestamp: Date.now() };
  //     }
  //     return idea;
  //   });
  //   setIdeasAndSaveToStorage(updatedIdeas);
  // };

  // const deleteIdea = (id: string) => {
  //   const filteredIdeas = ideas.filter((idea) => idea.id !== id);
  //   setIdeasAndSaveToStorage(filteredIdeas);
  // };

  return (
    <IdeaContext.Provider value={{ ideas, dispatch }}>
      {children}
    </IdeaContext.Provider>
  );
};
