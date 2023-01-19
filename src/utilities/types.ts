export interface IdeaType {
  title: string;
  description: string;
  timestamp: number;
  id: number;
}

export interface CardListProps {
  ideas: IdeaType[];
  updateIdea: (id: number, title: string, description: string) => void;
  deleteIdea: (id: number) => void;
}
