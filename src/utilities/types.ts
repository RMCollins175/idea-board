export interface IdeaType {
  title: string;
  description: string;
  timestamp: number;
  id: number;
}

export interface EditableIdeaType extends IdeaType {
  ideas: IdeaType[];
  updateIdea: (id: number, title: string, description: string) => void;
  deleteIdea: (id: number) => void;
}

export interface IdeaListProps {
  ideas: IdeaType[];
  updateIdea: (id: number, title: string, description: string) => void;
  deleteIdea: (id: number) => void;
}
