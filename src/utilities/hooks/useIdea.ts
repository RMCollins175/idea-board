import { useEffect, useState } from "react";
import { IdeaType } from "../types";

export const useIdeaHook = () => {
  const [ideas, setIdeas] = useState<IdeaType[]>(
    // JSON.parse(localStorage.getItem("ideas") || "[]")
    []
  );

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

  return {
    ideas,
    addIdea,
    updateIdea,
    deleteIdea
  };
};
