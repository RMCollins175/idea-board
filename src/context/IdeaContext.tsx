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
  DELETE_IDEA: "DELETE_IDEA",
  SET_IDEAS: "SET_IDEAS"
};

export const IdeaContextProvider = ({ children }: any) => {
  const [ideasStorage, setIdeasStorage] = useLocalStorage("ideas", "[]");

  useEffect(() => {
    if (ideasStorage && typeof ideasStorage === "string") {
      dispatch({
        type: "SET_IDEAS",
        payload: JSON.parse(ideasStorage)
      });
    }
  }, [ideasStorage]);

  const reducer = (state: IdeaType[], action: any) => {
    switch (action.type) {
      case ACTIONS.SET_IDEAS:
        return action.payload;
      case ACTIONS.ADD_IDEA:
        const newIdea = {
          id: uuidv4(),
          title: action.payload.title,
          description: action.payload.description,
          timestamp: Date.now()
        };
        setIdeasStorage(JSON.stringify([...state, newIdea]));
        return [...state, newIdea];
      case ACTIONS.UPDATE_IDEA:
        const updatedIdeas = state.map((idea) => {
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
        setIdeasStorage(JSON.stringify(updatedIdeas));
        return updatedIdeas;
      case ACTIONS.DELETE_IDEA:
        const filteredIdeas = state.filter(
          (idea) => idea.id !== action.payload.id
        );
        setIdeasStorage(JSON.stringify(filteredIdeas));
        return filteredIdeas;
      default:
        return state;
    }
  };

  const [ideas, dispatch] = useReducer(reducer, []);

  return (
    <IdeaContext.Provider value={{ ideas, dispatch }}>
      {children}
    </IdeaContext.Provider>
  );
};
