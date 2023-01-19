export interface IdeaType {
  title: string;
  description: string;
  timestamp: number;
  id: string;
}

export interface CardListProps {
  ideas: IdeaType[];
  updateIdea: (id: string, title: string, description: string) => void;
  deleteIdea: (id: string) => void;
}
